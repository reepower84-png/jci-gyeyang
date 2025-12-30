"use client";

export default function About() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#1e3a8a] font-semibold text-sm uppercase tracking-wider">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
            인천계양청년회의소 소개
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            청년회의소는 전 세계 100여 개국에서 활동하는 글로벌 청년 리더십 네트워크입니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">리더십 개발</h3>
                  <p className="text-gray-600">다양한 프로젝트와 활동을 통해 리더로서의 역량을 키우고 성장할 수 있습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">네트워킹</h3>
                  <p className="text-gray-600">지역과 전국, 그리고 세계의 청년 리더들과 교류하며 인맥을 넓힐 수 있습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">지역사회 봉사</h3>
                  <p className="text-gray-600">계양구 지역사회의 발전을 위한 다양한 봉사활동과 사회공헌 프로젝트에 참여합니다.</p>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToContact}
              className="mt-10 bg-[#1e3a8a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1e2f6b] transition-all transform hover:scale-105"
            >
              함께하기
            </button>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] p-8 rounded-2xl text-white text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">100+</div>
              <div className="text-white/80">전 세계 회원국</div>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-2">1949</div>
              <div className="text-gray-600">한국JCI 창립</div>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-2">20~45</div>
              <div className="text-gray-600">가입 연령</div>
            </div>
            <div className="bg-gradient-to-br from-[#FFCD00] to-[#f59e0b] p-8 rounded-2xl text-center">
              <div className="text-4xl lg:text-5xl font-bold text-[#1e3a8a] mb-2">계양</div>
              <div className="text-[#1e3a8a]/80">지역 청년 리더</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
