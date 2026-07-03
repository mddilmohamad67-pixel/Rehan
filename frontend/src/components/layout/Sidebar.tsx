'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  ImageIcon,
  Video,
  Music,
  Code,
  Zap,
  FileText,
  Globe,
  BarChart3,
  ChevronDown,
} from 'lucide-react';

const tools = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare, href: '/tools/chat' },
  { id: 'image', label: 'Image Generation', icon: ImageIcon, href: '/tools/image' },
  { id: 'video', label: 'Video Generation', icon: Video, href: '/tools/video' },
  { id: 'music', label: 'Music Generation', icon: Music, href: '/tools/music' },
  { id: 'code', label: 'Code Assistant', icon: Code, href: '/tools/code' },
  { id: 'voice', label: 'Voice Generation', icon: Zap, href: '/tools/voice' },
  { id: 'pdf', label: 'PDF Chat', icon: FileText, href: '/tools/pdf' },
  { id: 'website', label: 'Website Generator', icon: Globe, href: '/tools/website' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside className={`bg-card border-r border-border transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
              !isOpen && 'hidden'
            }`}>
              Tools
            </h3>
          </div>

          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = pathname === tool.href;
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
                title={tool.label}
              >
                <Icon size={20} />
                <span className={`text-sm font-medium ${ !isOpen && 'hidden' }`}>
                  {tool.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Link
            href="/dashboard"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-secondary transition"
            title="Dashboard"
          >
            <BarChart3 size={20} />
            <span className={`text-sm font-medium ${ !isOpen && 'hidden' }`}>
              Dashboard
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
