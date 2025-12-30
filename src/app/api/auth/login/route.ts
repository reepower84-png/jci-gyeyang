import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 관리자 계정 설정 (실제 운영 시에는 환경 변수나 데이터베이스 사용 권장)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "jci2024!";

// 간단한 토큰 생성 (실제 운영 시에는 JWT 등 사용 권장)
function generateToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random().toString(36).substring(2)}`).toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "아이디와 비밀번호를 입력해 주세요." },
        { status: 400 }
      );
    }

    // 관리자 인증 확인
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken();

      // 쿠키에 인증 토큰 저장
      const cookieStore = await cookies();
      cookieStore.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24시간
        path: "/",
      });

      return NextResponse.json(
        { message: "로그인 성공" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
