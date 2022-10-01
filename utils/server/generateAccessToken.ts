import jwt from 'jsonwebtoken'

type Props = {
  username: string;
  email: string;
}

export function generateAccessToken({username, email}: Props) {
  return jwt.sign({ username, email }, process.env.secret || '', { expiresIn: '30d' });
}