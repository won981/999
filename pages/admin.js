// pages/admin.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '9817') {
            // 비밀번호가 맞으면 데이터 입력 및 저장된 데이터 보기 페이지로 이동
            router.push('/admin/dashboard'); // 대시보드 페이지로 이동
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    };

    return (
        <div className="container">
            <h1>비밀번호 입력</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">확인</button>
            </form>
        </div>
    );
}
