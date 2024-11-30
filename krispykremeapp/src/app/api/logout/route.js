import { getCustomSession } from '../sessionCode.js';

export async function POST(req, res) {
  const session = await getCustomSession();
  session.destroy(); // Destroy the session
  
  await res.clearCookie('sessionID');// Replace with your actual cookie name
  return Response.json({ message: 'Logged out successfully' });
}
