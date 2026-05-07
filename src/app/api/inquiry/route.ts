import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 전화번호는 필수입니다." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("Discord webhook URL이 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "문의 접수 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const now = new Date();

    const embed = {
      embeds: [
        {
          title: "📩 새로운 입회문의가 접수되었습니다",
          color: 0x0066cc,
          fields: [
            {
              name: "이름",
              value: name,
              inline: true,
            },
            {
              name: "연락처",
              value: phone,
              inline: true,
            },
            {
              name: "문의내용",
              value: message || "(내용 없음)",
              inline: false,
            },
          ],
          footer: {
            text: "인천계양청년회의소",
          },
          timestamp: now.toISOString(),
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embed),
    });

    if (!response.ok) {
      console.error("Discord 전송 실패:", response.status);
      return NextResponse.json(
        { error: "문의 접수 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending inquiry:", error);
    return NextResponse.json(
      { error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
