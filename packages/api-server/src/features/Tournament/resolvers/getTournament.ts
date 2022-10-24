import fs from 'fs/promises'
import path from 'path'
import { Tournament } from '../types';

export default async function getEvent(name: string): Promise<Tournament> {
  const filePath = path.join(__dirname, `../data/${name}.event.json`)
  const file = await fs.readFile(filePath, 'utf-8')
  const tournament = JSON.parse(file) as Tournament

  return tournament
}