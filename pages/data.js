// pages/data.js
import { useState, useEffect } from 'react';

export default function DataPage() {
    const [data, setData] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // 로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        setData(storedData);
        setFilteredData(storedData); // 초기에는 모든 데이터 표시
    }, []);

    const handleSearch = () => {
        const result = data.filter(item => item.memberId === searchId);
        setFilteredData(result);
    };

    const handleDelete = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        localStorage.setItem('formData', JSON.stringify(updatedData));
        setFilteredData(updatedData); // 필터링된 데이터도 업데이트
    };

    return (
        <div className="container">
            <h1>저장된 데이터</h1>
            <input
                type="text"
                placeholder="회원번호 검색"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>
            <table>
                <thead>
                    <tr>
                        <th>회원번호</th>
                        <th>근육량 (kg)</th>
                        <th>체지방량 (kg)</th>
                        <th>체지방율 (%)</th>
                        <th>날짜</th>
                        <th>삭제</th>
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
                            <td>
                                <button onClick={() => handleDelete(index)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}