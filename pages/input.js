// pages/input.js
import { useState } from 'react';

export default function InputPage() {
    const [memberId, setMemberId] = useState('');
    const [muscleMass, setMuscleMass] = useState('');
    const [fatMass, setFatMass] = useState('');
    const [fatPercentage, setFatPercentage] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newData = { memberId, muscleMass, fatMass, fatPercentage, date };
        const existingData = JSON.parse(localStorage.getItem('formData')) || [];
        const updatedData = [...existingData, newData];

        // 로컬 스토리지에 데이터 저장
        localStorage.setItem('formData', JSON.stringify(updatedData));

        // 입력 필드 초기화
        setMemberId('');
        setMuscleMass('');
        setFatMass('');
        setFatPercentage('');
        setDate('');
    };

    return (
        <div className="container">
            <h1>데이터 입력</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="회원번호"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="근육량 (kg)"
                    value={muscleMass}
                    onChange={(e) => setMuscleMass(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="체지방량 (kg)"
                    value={fatMass}
                    onChange={(e) => setFatMass(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="체지방율 (%)"
                    value={fatPercentage}
                    onChange={(e) => setFatPercentage(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button type="submit">추가</button>
            </form>
        </div>
    );
}
