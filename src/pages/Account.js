import React, { useEffect, useState } from 'react';
import { deleteAccount, fetchAccount, registerAccount, updateAccount } from '../Services/accountService';

const AccountPage = () => {
    const [account, setAccount] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [accountData, setAccountData] = useState({
        accountKey: null,
        bankName: '',
        accountNumber: '',
        holderName: '',
    });

    const token = localStorage.getItem('token');

    const loadAccount = async () => {
        try {
            const data = await fetchAccount(token);
            if (data) {
                setAccountData({
                    accountKey: data.accountKey, // 로드된 데이터에서 설정
                    bankName: data.bankName,
                    accountNumber: data.accountNumber,
                    holderName: data.holderName,
                });
                setAccount(data); // 기존 account 상태 유지
            } else {
                setAccount(null);
            }
        } catch (error) {
            console.error('Error fetching account:', error);
        }
    };

    const handleSave = async () => {
        try {
            if (accountData.accountKey) {
                // 수정 시
                await updateAccount(token, accountData.accountKey, accountData);
                alert('계좌 정보가 성공적으로 수정되었습니다.');
            } else {
                // 등록 시
                await registerAccount(token, accountData);
                alert('계좌가 성공적으로 등록되었습니다.');
            }
            setIsEditing(false);
            loadAccount(); // 데이터 다시 로드
        } catch (error) {
            console.error('Error saving account:', error);
            alert('계좌 정보를 저장하는 데 실패했습니다.');
        }
    };
    
    const handleDelete = async () => {
        if (window.confirm('정말로 계좌를 삭제하시겠습니까?')) {
            try {
                await deleteAccount(token, accountData.accountKey); // accountData에서 accountKey 참조
                setAccount(null);
                setAccountData({ accountKey: null, bankName: '', accountNumber: '', holderName: '' }); // 초기화
                alert('계좌가 성공적으로 삭제되었습니다.');
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('계좌를 삭제하는 데 실패했습니다.');
            }
        }
    };
    

    // 수정 모드로 전환
    const startEditing = () => {
        if (account) {
            setAccountData({
                accountKey: account.accountKey, // 포함
                bankName: account.bankName,
                accountNumber: account.accountNumber,
                holderName: account.holderName,
            });
        }
        setIsEditing(true);
    };

    useEffect(() => {

        loadAccount();

    }, []);

    return (
        <div>
            <h1>계좌 관리</h1>
            {!isEditing ? (
                <div>
                    {account ? (
                        <div>
                            <p>은행: {account.bankName}</p>
                            <p>계좌 번호: {account.accountNumber}</p>
                            <p>소유주 이름: {account.holderName}</p>
                            <button onClick={startEditing}>수정하기</button>
                            <button onClick={handleDelete}>삭제하기</button>
                        </div>
                    ) : (
                        <div>
                            <p>등록된 계좌가 없습니다.</p>
                            <button onClick={startEditing}>계좌 등록</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2>{account ? '계좌 수정' : '계좌 등록'}</h2>
                    <input
                        type="text"
                        placeholder="은행 이름"
                        value={accountData.bankName}
                        onChange={(e) => setAccountData({ ...accountData, bankName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="계좌 번호"
                        value={accountData.accountNumber}
                        onChange={(e) => setAccountData({ ...accountData, accountNumber: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="소유주 이름"
                        value={accountData.holderName}
                        onChange={(e) => setAccountData({ ...accountData, holderName: e.target.value })}
                    />
                    <button onClick={handleSave}>{account ? '수정 완료' : '등록 완료'}</button>
                    <button onClick={() => setIsEditing(false)}>취소</button>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
