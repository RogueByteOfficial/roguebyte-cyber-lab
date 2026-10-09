import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

interface LinuxTerminalSimulatorProps {
  onCopyFlag: (flag: string) => void;
  lang: 'ar' | 'en';
}

interface CommandHistoryItem {
  command: string;
  output: string;
  isError?: boolean;
}

export const LinuxTerminalSimulator: React.FC<LinuxTerminalSimulatorProps> = ({ onCopyFlag, lang }) => {
  const isAr = lang === 'ar';
  const FLAG = 'ROGUE{su1d_f1nd_pr1v_3sc4l4t10n_pwn3d}';

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'system-init',
      output: 'Linux lab-box 6.6.0-rogue-isolated #1 SMP PREEMPT x86_64 GNU/Linux\nEphemeral sandbox ready. Type "help" for a list of available commands.'
    }
  ]);
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setPastCommands(prev => [...prev, trimmed]);
    setCommandHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const base = parts[0].toLowerCase();

    let output = '';
    let isError = false;

    switch (base) {
      case 'help':
      case '?':
        output = `Available Training Commands:
  id                                 Display current user UID and group IDs
  whoami                             Print effective username
  pwd                                Print working directory
  ls [-la]                           List directory contents
  cat <file>                         Concatenate and display file content
  sudo -l                            List allowed sudo privileges
  find <path> -perm <mode> ...       Search for files with specific permissions (SUID)
  uname -a                           Display kernel information
  netstat -tuln                      List network listening sockets
  clear                              Clear terminal buffer
  reset                              Reset terminal session`;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'reset':
        setHistory([{
          command: 'reset',
          output: 'Terminal session reset to baseline state.'
        }]);
        setInputVal('');
        return;

      case 'id':
        output = 'uid=1001(rogue-trainee) gid=1001(rogue-trainee) groups=1001(rogue-trainee)';
        break;

      case 'whoami':
        output = 'rogue-trainee';
        break;

      case 'pwd':
        output = '/home/rogue-trainee';
        break;

      case 'uname':
        output = 'Linux lab-box 6.6.0-rogue-isolated #1 SMP PREEMPT x86_64 GNU/Linux (Strictly sandboxed)';
        break;

      case 'netstat':
        output = `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 127.0.0.1:22            0.0.0.0:*               LISTEN     
tcp        0      0 10.200.1.10:3000        0.0.0.0:*               LISTEN`;
        break;

      case 'ls':
        if (trimmed.includes('-la') || trimmed.includes('-l')) {
          output = `total 20
drwxr-xr-x 2 rogue-trainee rogue-trainee 4096 Mar  9 04:00 .
drwxr-xr-x 3 root          root          4096 Mar  9 03:50 ..
-rw-r--r-- 1 rogue-trainee rogue-trainee  220 Mar  9 03:52 .bashrc
-rw-r--r-- 1 rogue-trainee rogue-trainee  807 Mar  9 03:52 .profile
-rw-r--r-- 1 rogue-trainee rogue-trainee  184 Mar  9 04:05 notes.txt`;
        } else {
          output = 'notes.txt';
        }
        break;

      case 'cat':
        if (trimmed.includes('notes.txt')) {
          output = `[Internal Memo for Sysadmin]:
"The find utility was compiled with SUID permission so developers can locate audit logs easily without root passwords. Make sure to fix this before production."`;
        } else if (trimmed.includes('/etc/passwd')) {
          output = `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
rogue-trainee:x:1001:1001:Rogue Trainee:/home/rogue-trainee:/bin/bash`;
        } else if (trimmed.includes('/root/flag.txt')) {
          output = 'cat: /root/flag.txt: Permission denied (Effective UID 1001 is not 0)';
          isError = true;
        } else {
          output = `cat: ${parts[1] || ''}: No such file or directory`;
          isError = true;
        }
        break;

      case 'sudo':
        output = `[sudo] password for rogue-trainee: 
Sorry, user rogue-trainee may not run sudo on lab-box.`;
        isError = true;
        break;

      case 'find':
      case '/usr/bin/find':
        if (trimmed.includes('-perm') && (trimmed.includes('-u=s') || trimmed.includes('-4000') || trimmed.includes('4000'))) {
          output = `/usr/bin/passwd
/usr/bin/sudo
/usr/bin/find
/usr/lib/openssh/ssh-keysign`;
        } else if (trimmed.includes('-exec') && (trimmed.includes('/root/flag.txt') || trimmed.includes('cat /root/flag.txt'))) {
          output = `[+] EXPLOITING SUID BINARY /usr/bin/find...
[+] Effective UID: 0 (root)
[+] Reading /root/flag.txt:

${FLAG}

[+] PRIVILEGE ESCALATION COMPLETED! Copy the flag to submit.`;
        } else if (trimmed.includes('-exec') && trimmed.includes('whoami')) {
          output = `root\nroot\nroot`;
        } else {
          output = './notes.txt';
        }
        break;

      default:
        output = `bash: ${base}: command not found. Type "help" for valid training commands.`;
        isError = true;
    }

    setHistory(prev => [...prev, { command: trimmed, output, isError }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIdx = commandHistoryIndex === -1 ? pastCommands.length - 1 : Math.max(0, commandHistoryIndex - 1);
        setCommandHistoryIndex(nextIdx);
        setInputVal(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistoryIndex !== -1) {
        const nextIdx = commandHistoryIndex + 1;
        if (nextIdx < pastCommands.length) {
          setCommandHistoryIndex(nextIdx);
          setInputVal(pastCommands[nextIdx]);
        } else {
          setCommandHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  const copyFlag = () => {
    onCopyFlag(FLAG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-200">rogue-trainee@lab-box: ~ (bash 5.2)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCommand('reset')}
            className="p-1 hover:text-white transition-colors"
            title={isAr ? 'إعادة ضبط الطرفية' : 'Reset terminal'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={copyFlag}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1 transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ العلم' : 'Copy Flag')}</span>
          </button>
        </div>
      </div>

      {/* Terminal Output Stream */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="p-4 min-h-[340px] max-h-[460px] overflow-y-auto space-y-3 bg-slate-950 text-slate-200 font-mono cursor-text"
      >
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            {h.command !== 'system-init' && (
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-emerald-400 font-bold">rogue-trainee@lab-box:~$</span>
                <span className="text-white">{h.command}</span>
              </div>
            )}
            <pre className={`whitespace-pre-wrap leading-relaxed ${h.isError ? 'text-red-400' : h.output.includes('ROGUE{') ? 'text-emerald-300 font-bold bg-emerald-950/30 p-2.5 rounded border border-emerald-900/50' : 'text-slate-300'}`}>
              {h.output}
            </pre>
          </div>
        ))}

        {/* Input Prompt */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-emerald-400 font-bold">rogue-trainee@lab-box:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            className="flex-1 bg-transparent text-white font-mono focus:outline-none caret-emerald-400"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Helper Exploit Bar */}
      <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        <span className="text-slate-500 font-sans font-medium">{isAr ? 'أوامر سريعة:' : 'Quick Shortcuts:'}</span>
        <button
          onClick={() => handleCommand('cat notes.txt')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          cat notes.txt
        </button>
        <button
          onClick={() => handleCommand('find / -perm -u=s -type f 2>/dev/null')}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          Enumerate SUID
        </button>
        <button
          onClick={() => handleCommand('find . -exec cat /root/flag.txt \\;')}
          className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/80 hover:bg-emerald-900 text-emerald-300 transition-colors font-bold"
        >
          Pwn SUID find 💥
        </button>
      </div>
    </div>
  );
};
