"use client";

export default function Benefits() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    {
      title: "전국 네트워크",
      description: "전국 JCI 회원들과의 네트워킹을 통해 사업과 경력에 도움이 되는 인맥을 구축할 수 있습니다.",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "리더십 역량 강화",
      description: "다양한 교육 프로그램과 실전 경험을 통해 리더로서의 역량을 체계적으로 개발할 수 있습니다.",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      title: "국제 교류 기회",
      description: "전 세계 100여 개국의 JCI 회원들과 교류하며 글로벌 시야와 경험을 넓힐 수 있습니다.",
      icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    },
    {
      title: "사회 공헌",
      description: "의미 있는 봉사활동과 사회공헌 프로젝트에 참여하여 지역사회에 긍정적인 변화를 만들 수 있습니다.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1e3a8a]/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-[#1e3a8a] font-semibold text-sm uppercase tracking-wider">
              Member Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-6">
              회원 혜택
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              인천계양청년회의소 회원이 되시면 개인의 성장과 함께 의미 있는 활동에 참여할 수 있는 다양한 기회가 주어집니다.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="mt-10 bg-[#FFCD00] text-[#1e3a8a] px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
            >
              지금 가입하기
            </button>
          </div>

          {/* Right Content - CTA Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] p-10 lg:p-12 rounded-3xl text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  지금 바로<br />인천계양청년회의소와 함께하세요
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  20세부터 45세까지의 청년이라면 누구나 가입할 수 있습니다.
                  함께 성장하고, 함께 나누고, 함께 변화를 만들어갑니다.
                </p>
                <button
                  onClick={scrollToContact}
                  className="bg-white text-[#1e3a8a] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 w-full"
                >
                  입회 문의하기
                </button>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-[#FFCD00] text-[#1e3a8a] px-6 py-3 rounded-full font-bold shadow-lg animate-float">
              20~45세 가입 가능
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
