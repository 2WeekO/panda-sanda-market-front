import React, { useEffect, useState } from 'react';
import '../CSS/RequestPage.css';
import { fetchMyPurchaseRequests } from '../Services/purchaseService';

const RequestPage = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const purchaseData = await fetchMyPurchaseRequests(token);
        setPurchaseRequests(purchaseData);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="request-page">
      <h2>구매 요청 관리</h2>
      <div className="request-section">
        <h3>구매 요청</h3>
        <ul>
          {purchaseRequests.length === 0 ? (
            <p>구매 요청이 없습니다.</p>
          ) : (
            purchaseRequests.map((request) => (
              <li key={request.id}>
                <p>상품 이름: {request.productName}</p>
                <p>메시지: {request.message}</p>
                <p>상태: {request.status}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RequestPage;