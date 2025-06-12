// This function closes all open windows in the end of the run of the Electron application.
import { BrowserWindow } from 'electron';

export function closeAllWindows(): void {
  const allWindows: BrowserWindow[] = BrowserWindow.getAllWindows();
  allWindows.forEach((window) => {
    window.close();
    window.destroy();
  });
}
