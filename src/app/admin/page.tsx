"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiry");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await fetch("/api/inquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setInquiries(
          inquiries.map((inq) =>
            inq.id === id ? { ...inq, is_read: true } : inq
          )
        );
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/inquiry?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const unreadCount = inquiries.filter((inq) => !inq.is_read).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 페이지</h1>
            <p className="text-gray-500 text-sm">인천계양청년회의소 문의 관리</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[#1e3a8a] hover:text-[#1e2f6b] font-medium"
            >
              메인 페이지로
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-[#1e3a8a]">{inquiries.length}</div>
            <div className="text-gray-500">전체 문의</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-red-500">{unreadCount}</div>
            <div className="text-gray-500">읽지 않은 문의</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-500">
              {inquiries.length - unreadCount}
            </div>
            <div className="text-gray-500">확인 완료</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Inquiry List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold text-gray-900">문의 목록</h2>
              </div>

              {isLoading ? (
                <div className="p-12 text-center text-gray-500">
                  로딩 중...
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  접수된 문의가 없습니다.
                </div>
              ) : (
                <div className="divide-y">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedInquiry?.id === inquiry.id ? "bg-blue-50" : ""
                      } ${!inquiry.is_read ? "border-l-4 border-l-[#1e3a8a]" : ""}`}
                      onClick={() => {
                        setSelectedInquiry(inquiry);
                        if (!inquiry.is_read) {
                          handleMarkAsRead(inquiry.id);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {inquiry.name}
                            </span>
                            {!inquiry.is_read && (
                              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {inquiry.phone}
                          </div>
                          {inquiry.message && (
                            <div className="text-sm text-gray-600 mt-2 truncate max-w-md">
                              {inquiry.message}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 whitespace-nowrap ml-4">
                          {formatDate(inquiry.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Inquiry Detail */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm sticky top-8">
              <div className="p-6 border-b">
                <h2 className="text-lg font-bold text-gray-900">문의 상세</h2>
              </div>

              {selectedInquiry ? (
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">이름</label>
                      <div className="font-medium text-gray-900 mt-1">
                        {selectedInquiry.name}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">전화번호</label>
                      <div className="font-medium text-gray-900 mt-1">
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="text-[#1e3a8a] hover:underline"
                        >
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">문의 내용</label>
                      <div className="font-medium text-gray-900 mt-1 whitespace-pre-wrap">
                        {selectedInquiry.message || "(내용 없음)"}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">접수 일시</label>
                      <div className="font-medium text-gray-900 mt-1">
                        {formatDate(selectedInquiry.created_at)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">상태</label>
                      <div className="mt-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            selectedInquiry.is_read
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {selectedInquiry.is_read ? "확인 완료" : "미확인"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t flex gap-2">
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="flex-1 bg-[#1e3a8a] text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-[#1e2f6b] transition-colors"
                    >
                      전화 걸기
                    </a>
                    <button
                      onClick={() => handleDelete(selectedInquiry.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  문의를 선택해 주세요.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
