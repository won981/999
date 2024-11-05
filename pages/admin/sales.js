// pages/admin/sales.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 사용
import * as XLSX from 'xlsx'; // xlsx 라이브러리 추가

export default function SalesPage() {
    const router = useRouter(); // useRouter 훅 사용
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [weeklySales, setWeeklySales] = useState(Array(5).fill('')); // 주차별 매출 입력
    const [selectedWeek, setSelectedWeek] = useState(''); // 선택된 주차
    const [memberName, setMemberName] = useState(''); // 회원 이름
    const [sessionCount, setSessionCount] = useState(''); // 세션 수
    const [salesData, setSalesData] = useState([]);
    const [expandedYears, setExpandedYears] = useState({}); // 연도별 펼침 상태 관리

    useEffect(() => {
        // 로컬 스토리지에서 기존 매출 데이터 불러오기
        const storedSalesData = JSON.parse(localStorage.getItem('salesData')) || [];
        setSalesData(storedSalesData);
    }, []);

    const handleAddSales = (e) => {
        e.preventDefault();
        if (!year || !month || !selectedWeek || !memberName || !sessionCount) {
            alert('모든 필드를 입력하세요.');
            return;
        }

        const amount = parseFloat(weeklySales[selectedWeek - 1]); // 주차별 매출
        const newSales = {
            year,
            month,
            week: selectedWeek,
            memberName,
            sessionCount: parseInt(sessionCount, 10),
            amount,
        }; // 주차와 매출 저장
        const updatedSalesData = [...salesData, newSales];

        // 로컬 스토리지에 데이터 저장
        localStorage.setItem('salesData', JSON.stringify(updatedSalesData));

        setSalesData(updatedSalesData);
        setWeeklySales(Array(5).fill('')); // 주차 초기화
        setSelectedWeek(''); // 선택된 주차 초기화
        setMemberName(''); // 회원 이름 초기화
        setSessionCount(''); // 세션 수 초기화
    };

    const handleDeleteSales = (index) => {
        const updatedSalesData = salesData.filter((_, i) => i !== index);
        setSalesData(updatedSalesData);
        localStorage.setItem('salesData', JSON.stringify(updatedSalesData)); // 로컬 스토리지 업데이트
    };

    const calculateTotalSales = (year) => {
        return salesData
            .filter(sale => sale.year === year)
            .reduce((acc, sale) => acc + (sale.amount || 0) * 10000, 0); // 만원 단위로 변환
    };

    const formatNumber = (num) => {
        return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'; // null 체크 추가
    };

    const uniqueYears = [...new Set(salesData.map(sale => sale.year))];

    const toggleYear = (year) => {
        setExpandedYears((prev) => ({
            ...prev,
            [year]: !prev[year],
        }));
    };

    // 엑셀 다운로드 함수 (연도별)
    const downloadExcel = (selectedYear) => {
        const filteredData = salesData.filter(sale => sale.year === selectedYear);
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${selectedYear} 매출 기록`);
        XLSX.writeFile(workbook, `${selectedYear}_sales_data.xlsx`);
    };

    return (
        <div className="container">
            <button onClick={() => router.push('/')}>메인 페이지로 돌아가기</button> {/* 메인 페이지로 돌아가는 버튼 */}
            <h1>매출 관리</h1>
            <form onSubmit={handleAddSales}>
                <input
                    type="text"
                    placeholder="연도 (예: 2024)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="월 (1-12)"
                    value={month}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (value >= 1 && value <= 12)) {
                            setMonth(value);
                        }
                    }}
                />
                <h4>주차 입력 (1~5):</h4>
                <input
                    type="number"
                    placeholder="주차 (1-5)"
                    value={selectedWeek}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (value >= 1 && value <= 5)) {
                            setSelectedWeek(value);
                        }
                    }}
                />
                <input
                    type="number"
                    placeholder="매출 입력 (만원)"
                    value={weeklySales[selectedWeek - 1] || ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        const newWeeklySales = [...weeklySales];
                        newWeeklySales[selectedWeek - 1] = value;
                        setWeeklySales(newWeeklySales);
                    }}
                />
                <input
                    type="text"
                    placeholder="회원 이름"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="세션 수"
                    value={sessionCount}
                    onChange={(e) => setSessionCount(e.target.value)}
                />
                <button type="submit">추가</button>
            </form>

            <h2>매출 기록</h2>
            {uniqueYears.map((year) => (
                <div key={year}>
                    <button onClick={() => downloadExcel(year)}>엑셀로 다운로드</button> {/* 연도별 엑셀 다운로드 버튼 */}
                    <h3 onClick={() => toggleYear(year)} style={{ cursor: 'pointer' }}>
                        {year}년 {expandedYears[year] ? '▼' : '▲'}
                    </h3>
                    <h4>총 매출: {formatNumber(calculateTotalSales(year))} 원</h4> {/* 연도별 총 매출 */}
                    {expandedYears[year] && (
                        <table>
                            <thead>
                                <tr>
                                    <th>월</th>
                                    <th>주차</th>
                                    <th>회원 이름</th>
                                    <th>세션 수</th>
                                    <th>단가 (원)</th>
                                    <th>매출 금액 (원)</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData
                                    .filter(sale => sale.year === year)
                                    .sort((a, b) => {
                                        // 최신 입력된 데이터가 위로 오도록 정렬
                                        const dateA = new Date(`${a.year}-${a.month}-${a.week}`);
                                        const dateB = new Date(`${b.year}-${b.month}-${b.week}`);
                                        return dateB - dateA; // 내림차순 정렬
                                    })
                                    .map((sale, index) => {
                                        const unitPrice = sale.sessionCount ? (sale.amount * 10000) / sale.sessionCount : 0; // 단가 계산
                                        return (
                                            <tr key={index}>
                                                <td>{sale.month}</td>
                                                <td>{sale.week}주차</td> {/* 주차 표시 */}
                                                <td>{sale.memberName}</td> {/* 회원 이름 표시 */}
                                                <td>{sale.sessionCount}</td> {/* 세션 수 표시 */}
                                                <td>{formatNumber(unitPrice)} 원</td> {/* 단가 표시 */}
                                                <td>{formatNumber(sale.amount * 10000)} 원</td> {/* 매출 금액 표시 */}
                                                <td>
                                                    <button onClick={() => handleDeleteSales(index)}>삭제</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </div>
    );
}