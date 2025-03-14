import React, { useEffect, useState } from 'react';
import { fetchRequestsByBuyer, approveCheckRequest , rejectCheckRequest, paymentCheckRequest, getAccountInfo, paymentCompleteRequest } from '../../Services/purchaseService';
import { getUserKey } from '../../Services/userService';

const BuyerRequestPage = () => {
  const [requests, setRequests] = useState([]);
  
  const [error, setError] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(600); // 10분 (600초)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('로그인이 필요합니다.');
      
      return;
    }

    const fetchData = async () => {
      
      try {
        const userKey = await getUserKey(token);
        const data = await fetchRequestsByBuyer(userKey, token);
        setRequests(data);
      } catch (err) {
        console.error('Error fetching buyer requests:', err);
        setError('데이터를 가져오는 데 실패했습니다.');
      }
    };

    fetchData();
  }, []);

  const handleApproveCheck = async (requestId) => {
    const isConfirmed = window.confirm("승인 확인을 하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await approveCheckRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.map(req =>
          req.requestId === requestId ? { ...req, status: "확인됨" } : req
        )
      );

      alert("승인 확인이 완료되었습니다.");
    } catch (err) {
      console.error('승인 실패:', err);
      alert('승인 확인 처리에 실패했습니다.');
    }
  };

  const handleRejectCheck = async (requestId) => {
    const isConfirmed = window.confirm("거절 확인을 하시면 구매 요청 목록에서 삭제됩니다. 거절 확인을 하시겠습니까? ");
    if (!isConfirmed) return;

    try {
      await rejectCheckRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.map(req =>
          req.requestId === requestId ? { ...req, status: "거절됨" } : req
        )
      );

      alert("정상적으로 거절 확인이 완료되었습니다.");
    } catch (err) {
      console.error('거절 실패:', err);
      alert('거절 확인 처리에 실패했습니다.');
    }
  };

  const handlePaymentCheck = async (requestId) => {
    const isConfirmed = window.confirm("결제 요청을 수락하시면 계좌 이체를 위해 판매자의 계좌 정보를 복사할 수 있게 됩니다. 결제 요청을 수락하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await paymentCheckRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.map(req =>
          req.requestId === requestId ? { ...req, status: "결제 요청 수락" } : req
        )
      );

      alert("정상적으로 결제 요청을 수락하였습니다.");
    } catch (err) {
      console.error('결제 요청 수락 실패:', err);
      alert('결제 요청 수락에 실패했습니다.');
    }
  };

  const handlePaymentCompleteRequest = async (requestId) => {
    const isConfirmed = window.confirm("결제 완료 요청을 하시기 전, 판매자에게 계좌 이체를 하셨나요? 판매자에게 결제 확인 요청을 하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await paymentCompleteRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.map(req =>
          req.requestId === requestId ? { ...req, status: "결제 요청 수락" } : req
        )
      );

      alert("정상적으로 결제 완료 요청이 되었습니다.");
    } catch (err) {
      console.error('결제 완료 요청 수락 실패:', err);
      alert('결제 완료 요청 수락에 실패했습니다.');
    }
  };

  

  const handleAccountCheck = async (sellerId) => {
    const isConfirmed = window.confirm("계좌를 조회하시면 10분의 제한 시간 내에 이체를 완료해주셔야 합니다. 지금 판매자의 계좌를 조회하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const accountData = await getAccountInfo(sellerId);
      setAccountInfo(accountData);
      setShowPopup(true);
      setTimer(600); // 10분 타이머 초기화

      // 타이머 시작 (1초마다 감소)
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setShowPopup(false);
            setAccountInfo(null); // 10분 후 계좌 정보 숨김
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("계좌 조회 실패:", err);
      alert("계좌 확인에 실패했습니다.");
    }
  };

  



  
  if (error) return <p>{error}</p>;

  // 가격 포맷팅 함수
  const formatPrice = (price) => price.toLocaleString() + "원";

  return (
    <div className="management-page">
  <h2>내 구매 요청</h2>
  <div className="tip-message">
    Tip! 결제 요청을 수락할 시 판매자의 계좌 정보를 확인할 수 있습니다.<br />
    계좌 정보를 정확하게 기재하시고 구매하고자 하는 상품 금액을 판매자에게 이체하시면 됩니다.
  </div>

  {requests.length === 0 ? (
    <p className="management-no-request">구매 요청 내역이 없습니다.</p>
  ) : (
    <table className="management-table">
      <thead>
        <tr>
          <th>상품 이름</th>
          <th>상태</th>
          <th>메시지</th>
          <th>가격</th>
          <th>구매 절차</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req.requestId}>
            <td className='management-item'>{req.productName}</td>
            <td className='management-item'>
              <span className={`management-status ${req.status}`}>{req.status}</span>
            </td>
            <td className='management-item'>{req.message}</td>
            <td className='management-item'>{`${formatPrice(req.productPrice)}`}</td>
            
            <td className='management-item'>
              <div className="management-button-group">
                <button
                  className="management-btn"
                  onClick={() => handleApproveCheck(req.requestId)}
                  disabled={req.status !== '승인됨'}
                >
                  승인 확인
                </button>
                <button
                  className="management-btn"
                  onClick={() => handleRejectCheck(req.requestId)}
                  disabled={req.status !== '거절됨'}
                >
                  거절 확인
                </button>
                <button
                  className="management-btn"
                  onClick={() => handlePaymentCheck(req.requestId)}
                  disabled={req.status !== '결제 요청중'}
                >
                  결제 요청 수락
                </button>
                <button
                  className="management-btn"
                  onClick={() => handleAccountCheck(req.sellerId)}
                  disabled={req.status !== '결제 요청 수락'}
                >
                  계좌 확인
                </button>
                <button
                  className="management-btn"
                  onClick={() => handlePaymentCompleteRequest(req.requestId)}
                  disabled={req.status !== '결제 요청 수락'}
                >
                  결제 완료 요청
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}

  {/* 계좌 정보 팝업 */}
  {showPopup && accountInfo && (
    <div className="popup">
      <div className="popup-content">
        <h3>판매자 계좌 정보</h3>
        <p>은행: {accountInfo.bankName}</p>
        <p>계좌번호: {accountInfo.accountNumber}</p>
        <p>예금주: {accountInfo.holderName}</p>
        <p className="timer">남은 시간: {Math.floor(timer / 60)}분 {timer % 60}초</p>
        <button className="close-btn" onClick={() => setShowPopup(false)}>닫기</button>
      </div>
    </div>
  )}
</div>

  );
};

export default BuyerRequestPage;
