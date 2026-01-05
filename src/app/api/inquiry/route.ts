import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function sendDiscordNotification(name: string, phone: string, message: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Discord webhook URL이 설정되지 않았습니다.");
    return;
  }

  const now = new Date();
  const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
  const formattedDate = koreanTime.toISOString().replace('T', ' ').substring(0, 19);

  const embed = {
    embeds: [
      {
        title: "새로운 문의가 접수되었습니다",
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

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embed),
    });
  } catch (error) {
    console.error("Discord 알림 전송 실패:", error);
  }
}

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

    const { error } = await supabase.from("inquiries").insert([
      {
        name,
        phone,
        message: message || "",
        is_read: false,
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "문의 접수 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // Discord로 알림 전송
    await sendDiscordNotification(name, phone, message);

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding inquiry:", error);
    return NextResponse.json(
      { error: "문의 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "문의 목록을 불러오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "문의 목록을 불러오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID가 필요합니다." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("inquiries")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "처리 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "읽음 처리되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error marking as read:", error);
    return NextResponse.json(
      { error: "처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID가 필요합니다." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", parseInt(id));

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "삭제 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
