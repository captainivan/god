
import connectDB from "@/lib/connectDB";
import TokenModel from "@/lib/models/Token"; // create this model

export async function POST(request) {
  try {
    const { token } = await request.json();
    await connectDB();

    // Check if token already exists
    const exists = await TokenModel.findOne({ token });
    if (!exists) {
      await TokenModel.create({ token });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving token:", error);
    return Response.json({ success: false, error: error.message });
  }
}
