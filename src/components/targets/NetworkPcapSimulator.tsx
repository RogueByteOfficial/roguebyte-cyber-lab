import React, { useState } from 'react';
import { Network, Search, Copy, CheckCircle2, ShieldAlert, ArrowDownRight, Eye } from 'lucide-react';

interface NetworkPcapSimulatorProps {
  onCopyFlag: (flag: string) => void;
  lang: 'ar' | 'en';
}

interface Packet {
  no: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'ARP' | 'HTTP' | 'TCP' | 'DNS';
  length: number;
  info: string;
  payload?: string;
  isMalicious?: boolean;
}

export const NetworkPcapSimulator: React.FC<NetworkPcapSimulatorProps> = ({ onCopyFlag, lang }) => {
  const isAr = lang === 'ar';
  const FLAG = 'ROGUE{pcap_cl3art3xt_cr3ds_1nt3rc3pt3d}';

  const [filterProtocol, setFilterProtocol] = useState<'ALL' | 'HTTP' | 'ARP' | 'TCP'>('ALL');
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [copied, setCopied] = useState(false);

  const packets: Packet[] = [
    {
      no: 1,
      time: '0.000000',
      source: '10.200.1.50',
      destination: '10.200.1.1',
      protocol: 'ARP',
      length: 42,
      info: 'Who has 10.200.1.1? Tell 10.200.1.50',
      payload: 'ARP Request: Sender MAC: 52:54:00:12:34:56 Target IP: 10.200.1.1'
    },
    {
      no: 2,
      time: '0.001420',
      source: '10.200.1.99',
      destination: '10.200.1.50',
      protocol: 'ARP',
      length: 42,
      info: '10.200.1.1 is at 02:42:0a:c8:01:63 (Gratuitous ARP / Poisoning)',
      isMalicious: true,
      payload: 'ARP Reply (Spoofed): Attacker claiming to own Gateway 10.200.1.1.'
    },
    {
      no: 3,
      time: '0.045100',
      source: '10.200.1.50',
      destination: '10.200.1.10',
      protocol: 'TCP',
      length: 74,
      info: '54210 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
      payload: 'TCP Handshake SYN'
    },
    {
      no: 4,
      time: '0.046300',
      source: '10.200.1.10',
      destination: '10.200.1.50',
      protocol: 'TCP',
      length: 74,
      info: '80 → 54210 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0',
      payload: 'TCP Handshake SYN-ACK'
    },
    {
      no: 5,
      time: '0.048900',
      source: '10.200.1.50',
      destination: '10.200.1.10',
      protocol: 'HTTP',
      length: 412,
      info: 'POST /api/v1/auth/login HTTP/1.1 (application/json)',
      isMalicious: true,
      payload: `POST /api/v1/auth/login HTTP/1.1
Host: secure-portal.rogue-lab.local
User-Agent: Mozilla/5.0 (Client-Station)
Content-Type: application/json
Content-Length: 128

{
  "username": "network_ops_lead",
  "password_unencrypted": "P@ssw0rd2026!#",
  "flag": "ROGUE{pcap_cl3art3xt_cr3ds_1nt3rc3pt3d}"
}`
    },
    {
      no: 6,
      time: '0.051200',
      source: '10.200.1.10',
      destination: '10.200.1.50',
      protocol: 'HTTP',
      length: 220,
      info: 'HTTP/1.1 200 OK (application/json)',
      payload: 'HTTP/1.1 200 OK\nSet-Cookie: session=eyJhbGciOi...; Path=/'
    }
  ];

  const filteredPackets = packets.filter(p => {
    if (filterProtocol === 'ALL') return true;
    return p.protocol === filterProtocol;
  });

  const handleCopy = () => {
    onCopyFlag(FLAG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans text-xs">
      {/* PCAP Viewer Toolbar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" />
          <span className="font-mono font-bold text-slate-200">capture_stream_eth0.pcap</span>
          <span className="text-slate-500 text-[11px] font-mono">(6 packets captured)</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          {(['ALL', 'HTTP', 'ARP', 'TCP'] as const).map(p => (
            <button
              key={p}
              onClick={() => setFilterProtocol(p)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                filterProtocol === p ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Packet List Grid */}
      <div className="overflow-x-auto max-h-[220px]">
        <table className="w-full text-left rtl:text-right font-mono text-[11px]">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 sticky top-0">
            <tr>
              <th className="py-2 px-3">No.</th>
              <th className="py-2 px-3">Time</th>
              <th className="py-2 px-3">Source</th>
              <th className="py-2 px-3">Destination</th>
              <th className="py-2 px-3">Protocol</th>
              <th className="py-2 px-3">Len</th>
              <th className="py-2 px-3">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredPackets.map(p => {
              const isSelected = selectedPacket?.no === p.no;
              return (
                <tr
                  key={p.no}
                  onClick={() => setSelectedPacket(p)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/70 text-cyan-200 font-semibold'
                      : p.isMalicious
                      ? 'bg-red-950/20 hover:bg-red-950/40 text-slate-200'
                      : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <td className="py-1.5 px-3">{p.no}</td>
                  <td className="py-1.5 px-3 tabular-nums">{p.time}</td>
                  <td className="py-1.5 px-3">{p.source}</td>
                  <td className="py-1.5 px-3">{p.destination}</td>
                  <td className="py-1.5 px-3 font-bold text-cyan-400">{p.protocol}</td>
                  <td className="py-1.5 px-3 tabular-nums">{p.length}</td>
                  <td className="py-1.5 px-3 truncate max-w-xs">{p.info}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Packet Dissector / Inspector Pane */}
      <div className="border-t border-slate-800 p-4 bg-slate-950 space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'فاحص الحزم والبيانات الخام (Packet Dissector)' : 'Packet Payload & Header Dissector'}</span>
          </div>
          {selectedPacket?.payload?.includes('ROGUE{') && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ العلم' : 'Copy Flag')}</span>
            </button>
          )}
        </div>

        {selectedPacket ? (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs space-y-2 text-slate-300">
            <div className="text-slate-400 border-b border-slate-800 pb-1.5">
              Frame #{selectedPacket.no}: {selectedPacket.protocol} ({selectedPacket.length} bytes on wire)
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-cyan-300 overflow-x-auto max-h-[140px]">
              {selectedPacket.payload}
            </pre>
          </div>
        ) : (
          <div className="text-center py-6 text-slate-500 text-xs">
            {isAr
              ? 'اضغط على الحزمة رقم 5 (HTTP POST) لعرض الحمولة واستخراج بيانات الاعتماد غير المشفرة والعلم.'
              : 'Click on Packet #5 (HTTP POST) to inspect unencrypted plaintext payload and extract the flag.'}
          </div>
        )}
      </div>
    </div>
  );
};
