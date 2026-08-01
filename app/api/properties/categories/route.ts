import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_CATEGORIES_URL =
  "https://rentnest-backend-six.vercel.app/api/properties/categories";

export async function GET() {
  try {
    const response = await axios.get(BACKEND_CATEGORIES_URL, {
      timeout: 20000,
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response?.data?.message || error.message ||
            "Failed to fetch categories.",
        },
        {
          status: error.response?.status || 500,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories.",
      },
      {
        status: 500,
      },
    );
  }
}
