# Clear Path NEMT - Quick Start Scripts

These scripts make it easy to start and stop your development environment without remembering commands.

**Now using npm (stable)** ✅
- Replaced pnpm with npm to avoid registry issues
- All scripts updated to use `npm install` and `npm run dev`
- More reliable on Windows and across platforms

**Available in multiple formats:**
- 🪟 Windows Batch (.bat) - For Windows Command Prompt (Recommended)
- 🐧 Bash Scripts (.sh) - For Mac, Linux, WSL, Git Bash
- 💻 PowerShell (.ps1) - For PowerShell users

## 🚀 Quick Start

### Option 1: Batch Files (Easiest)

**Start Development:**
1. Double-click `start-dev.bat`
2. Wait for servers to start
3. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - API Docs: http://localhost:3001/api/docs

**Stop Development:**
- Double-click `stop-dev.bat`
- Or press `Ctrl+C` in the start-dev window

### Option 2: PowerShell Scripts

**Start Development:**
```powershell
.\start-dev.ps1
```

**Stop Development:**
```powershell
.\stop-dev.ps1
```

## 📁 Script Files

### Windows Batch Scripts
| File | Purpose | Usage |
|------|---------|-------|
| `start-dev.bat` | Start servers | Double-click or `start-dev.bat` |
| `stop-dev.bat` | Stop servers | Double-click or `stop-dev.bat` |
| `clean-install.bat` | Fix pnpm issues | Double-click or `clean-install.bat` |

### Bash Scripts (Mac/Linux/WSL/Git Bash)
| File | Purpose | Usage |
|------|---------|-------|
| `start-dev.sh` | Start servers | `./start-dev.sh` or `bash start-dev.sh` |
| `stop-dev.sh` | Stop servers | `./stop-dev.sh` or `bash stop-dev.sh` |
| `clean-install.sh` | Fix pnpm issues | `./clean-install.sh` or `bash clean-install.sh` |

### PowerShell Scripts
| File | Purpose | Usage |
|------|---------|-------|
| `start-dev.ps1` | Start servers | `.\start-dev.ps1` |
| `stop-dev.ps1` | Stop servers | `.\stop-dev.ps1` |

## ✨ Features

✅ **Auto-installs dependencies** on first run  
✅ **Checks for node_modules** before starting  
✅ **Shows server URLs** with colors  
✅ **Handles errors gracefully**  
✅ **Works on Windows 10/11**  

## 🔧 What They Do

### start-dev.bat / start-dev.ps1
1. Checks you're in the right directory
2. Installs dependencies if needed (first time only)
3. Starts all development servers:
   - Frontend (Next.js) on port 3000
   - Backend (NestJS) on port 3001
4. Displays server URLs
5. Runs until you press `Ctrl+C`

### stop-dev.bat / stop-dev.ps1
1. Kills all running Node processes
2. Stops frontend and backend servers
3. Cleans up gracefully

## 📍 Running from File Explorer

### Windows Batch Files (Recommended)
1. Open File Explorer
2. Navigate to `C:\Working\Websites\NEMT`
3. Double-click `start-dev.bat`
4. A command window opens and starts servers

### PowerShell Scripts
1. Right-click `start-dev.ps1`
2. Select "Run with PowerShell"
3. If you get an error about execution policy, run PowerShell as Administrator and type:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## 🚨 Troubleshooting

### ❌ pnpm Registry Error (ERR_PNPM_META_FETCH_FAIL)
**Error looks like:** `Value of "this" must be of type URLSearchParams`

**Quick Fix:**
```bash
# Windows Batch:
clean-install.bat

# Bash/Mac/Linux:
./clean-install.sh
```

**What it does:**
1. Clears pnpm cache
2. Removes all node_modules
3. Removes lock files
4. Reinstalls everything fresh
5. Takes 2-5 minutes

**If that doesn't work, use npm instead:**
```bash
npm install
npm run dev
```

### "node_modules missing" error
- The script will auto-install on first run
- If it fails, run: `clean-install.bat` or `./clean-install.sh`

### Servers won't start
- Check if ports 3000/3001 are in use
- Run `stop-dev.bat` first
- Or manually kill processes: `taskkill /F /IM node.exe`

### PowerShell won't execute scripts
- Run PowerShell as Administrator
- Type: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Press Y to confirm
- Now scripts will work

### Bash scripts won't run on Windows
**Option 1: Git Bash (Recommended)**
- Install Git for Windows
- Right-click folder → "Git Bash Here"
- Run: `./start-dev.sh`

**Option 2: WSL (Windows Subsystem for Linux)**
- Install WSL2
- Open WSL terminal
- Navigate to project and run: `./start-dev.sh`

**Option 3: Use Batch files instead**
- Just use `start-dev.bat` (no installation needed)

## 💡 Pro Tips

### Create Desktop Shortcut (Windows)
1. Right-click `start-dev.bat` → "Send to" → "Desktop (create shortcut)"
2. Rename to "Clear Path Dev Start"
3. Double-click from desktop to start

### Create Start Menu Shortcut
1. Right-click `start-dev.bat`
2. Copy the full path
3. Create a shortcut anywhere
4. Set it to run "minimized" for cleaner desktop

### Keyboard Shortcut to Stop
Instead of double-clicking:
```bash
# In Command Prompt or PowerShell
taskkill /F /IM node.exe
```

## 📊 What's Running

When you run `start-dev.bat`, these services start:

| Service | Port | URL |
|---------|------|-----|
| Frontend (Next.js) | 3000 | http://localhost:3000 |
| Backend (NestJS) | 3001 | http://localhost:3001 |
| API Documentation | 3001 | http://localhost:3001/api/docs |
| Supabase | Cloud | Your Supabase project |

## 🔗 Related Commands (if you prefer terminal)

```bash
# Install dependencies manually
pnpm install

# Start all servers
pnpm dev

# Start only backend
pnpm --filter @clear-path/backend dev

# Start only frontend
pnpm --filter @clear-path/frontend dev

# Stop (use Ctrl+C in any terminal)
```

## ✅ Checklist Before Starting

- [ ] `.env.local` file exists with your Supabase credentials
- [ ] Supabase database schema initialized (SQL script run)
- [ ] Test admin user created in database
- [ ] Node.js installed (`node --version`)
- [ ] pnpm installed (`pnpm --version`)

## 🎯 Getting Help

If scripts don't work:

1. **Check directory:** Make sure you're in `C:\Working\Websites\NEMT`
2. **Check installations:** Run `node --version` and `pnpm --version`
3. **Check ports:** Ports 3000 and 3001 must be free
4. **Check .env.local:** Make sure it has your Supabase credentials
5. **Manual start:** Open terminal and run `pnpm dev`

---

**That's it!** Just double-click `start-dev.bat` and you're good to go! 🚀
