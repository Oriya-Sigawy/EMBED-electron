//This function ensuring the app quits when all windows are closed
import { app } from 'electron';

export default function handleWindowAllClosed(): void {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}
