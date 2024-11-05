// pages/admin/dashboard.js
import Link from 'next/link';
import { useRouter } from 'next/router'; // useRouter 추가

export default function AdminDashboard() {
    const router = useRouter(); // useRouter 훅 사용

    return (
        <div className="container">
            <button onClick={() => router.push('/')}>메인 페이지로 돌아가기</button> {/* 메인 페이지로 돌아가는 버튼 */}
            <h1>관리자 대시보드</h1>
            <Link href="/input">
                <button>데이터 입력</button>
            </Link>
            <br />
            <br />
            <Link href="/data">
                <button>저장된 데이터 보기</button>
            </Link>
            <br />
            <br />
            <Link href="/admin/sales">
                <button>매출 관리</button>
            </Link>
        </div>
    );
}