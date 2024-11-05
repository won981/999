// pages/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    const [data, setData] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        setData(storedData);
    }, []);

    const handleSearch = () => {
        const result = data.filter(item => item.memberId === searchId);
        // 날짜순으로 정렬
        const sortedResult = result.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredData(sortedResult);
    };

    return (
        <div className="container">
            <h1>회원 관리 ERP</h1>
            <Link href="/admin">
                <button>관리자 전용12</button>
            </Link>
            <h2>내 인바디 검색</h2>
            <input
                type="text"
                placeholder="회원번호 검색"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>

            {filteredData.length > 0 ? (
                <div>
                    <h2>검색 결과</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>회원번호</th>
                                <th>근육량 (kg)</th>
                                <th>체지방량 (kg)</th>
                                <th>체지방율 (%)</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.memberId}</td>
                                    <td>{item.muscleMass}</td>
                                    <td>{item.fatMass}</td>
                                    <td>{item.fatPercentage}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                searchId && <p>해당 회원번호에 대한 데이터가 없습니다.</p>
            )}
        </div>
    );
}
