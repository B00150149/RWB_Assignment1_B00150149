import { getCustomSession } from '../sessionCode.js';

export async function POST(req, res) {
  const session = await getCustomSession();
  session.destroy(); // Destroy the session
  return Response.json({ message: 'Logged out successfully' });
}
