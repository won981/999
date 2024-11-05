// pages/password.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PasswordPage() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '9817') {
            // 비밀번호가 맞으면 이전 페이지로 돌아가기
            router.push(router.query.redirect || '/');
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
