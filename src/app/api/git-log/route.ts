import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('git log --oneline -n 20');
    const commits = stdout.trim().split('\n').filter(line => line.length > 0);
    
    return Response.json({ commits });
  } catch (error) {
    console.error('Failed to fetch git log:', error);
    return Response.json(
      { error: 'Failed to fetch git log' },
      { status: 500 }
    );
  }
}