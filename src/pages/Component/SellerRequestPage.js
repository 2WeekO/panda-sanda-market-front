import React, { useEffect, useReducer } from 'react';
import { approveRequest, fetchRequestsBySeller, rejectRequest, paymentRequest, paymentCompleteCheck} from '../../Services/purchaseService';
import { getUserKey } from '../../Services/userService';

const initialState = {
  requests: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, requests: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return {
        ...state,
        requests: state.requests.map((req) =>
          req.id === action.payload.id ? action.payload : req
        ),
      };
    default:
      return state;
  }
};

const SellerRequestPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { requests, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('로그인이 필요합니다.');

        const sellerId = await getUserKey(token);
        const data = await fetchRequestsBySeller(sellerId, token);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        console.error('Error fetching seller requests:', err);
        dispatch({ type: 'FETCH_ERROR', payload: '데이터를 가져오는 데 실패했습니다.' });
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (requestId) => {
    const isConfirmed = window.confirm("승인을 하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const updatedRequest = await approveRequest(requestId);
      dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest });
      alert("승인이 완료되었습니다.");
    } catch (err) {
      console.error('승인 실패:', err);
      alert('승인 처리에 실패했습니다.');
    }
  };

  const handleReject = async (requestId) => {
    const isConfirmed = window.confirm("거절을 하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const updatedRequest = await rejectRequest(requestId);
      dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest });
      alert("거절이 완료되었습니다.");
    } catch (err) {
      console.error('거절 실패:', err);
      alert('거절 처리에 실패했습니다.');
    }
  };

  const handlePaymentRequest = async (requestId) => {
    const isConfirmed = window.confirm("구매자에게 결제를 요청하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const updatedRequest = await paymentRequest(requestId);
      dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest });
      alert("정상적으로 구매자에게 결제를 요청하였습니다.");
    } catch (err) {
      console.error('결제 요청 실패:', err);
      alert('구매자에게 결제 요청을 실패하였습니다.');
    }
  };

  const handlePaymentCompleteCheck = async (requestId) => {
    const isConfirmed = window.confirm("정상적으로 계좌 이체가 되었나요? 상품 판매를 완료하시겠습니까?");
    if (!isConfirmed) return;

    try {
      const updatedRequest = await paymentCompleteCheck(requestId);
      dispatch({ type: 'UPDATE_REQUEST', payload: updatedRequest });
      alert("정상적으로 상품이 판매 되었습니다.");
    } catch (err) {
      console.error('결제 요청 실패:', err);
      alert('정상적으로 결제 확인이 되지 않았습니다.');
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  // 가격 포맷팅 함수
  const formatPrice = (price) => price.toLocaleString() + "원";

  return (
    <div className="management-page">
  <h2 className="management-title">판매 상품 관리</h2>
  <div className="tip-message">
    결제 요청을 할 시 등록된 계좌 정보가 구매자에게 표시됩니다.
  </div>

  {requests.length === 0 ? (
    <p className="management-no-request">구매 요청 내역이 없습니다.</p>
  ) : (
    <table className="management-table">
      <thead>
        <tr>
          <th>상품 명</th>
          <th>상품 상태</th>
          <th>메시지</th>
          <th>가격</th>
          <th>판매 절차</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req.requestId}>
            <td className='management-item'>{req.productName}</td>
            <td className='management-item'>{req.status}</td>
            <td className='management-item'>{req.message}</td>
            <td className='management-item'>{`${formatPrice(req.productPrice)}`}</td>
            <td className='management-item'>
              <div className="management-button-group">
                <button
                  className="management-btn"
                  onClick={() => handleApprove(req.requestId)}
                  disabled={req.status !== '대기 중'}
                >
                  승인
                </button>
                <button
                  className="management-btn"
                  onClick={() => handleReject(req.requestId)}
                  disabled={req.status !== '대기 중'}
                >
                  거절
                </button>
                <button
                  className="management-btn"
                  onClick={() => handlePaymentRequest(req.requestId)}
                  disabled={req.status !== '승인 확인 완료'}
                >
                  결제 요청하기
                </button>
                <button
                  className="management-btn"
                  onClick={() => handlePaymentCompleteCheck(req.requestId)}
                  disabled={req.status !== '결제 완료 요청'}
                >
                  결제 확인 및 상품 판매 완료
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
  );
};

export default SellerRequestPage;
