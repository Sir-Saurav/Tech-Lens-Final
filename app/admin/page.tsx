'use client';

import { useState } from 'react';
import { Shield, Plus, RefreshCw, Trash2, Eye, Video, Package, Search, ExternalLink, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [asinInput, setAsinInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addResult, setAddResult] = useState<{ success: boolean; message: string; productSlug?: string } | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_HINT || password.length > 6) {
      // Actually verify via API
      fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      }).then(r => r.json()).then(data => {
        if (data.ok) {
          setIsAuthenticated(true);
          setAuthError('');
          sessionStorage.setItem('tl_admin_pass', password);
        } else {
          setAuthError('Wrong password. Try again.');
        }
      });
    } else {
      setAuthError('Password too short.');
    }
  };

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const handleAddProduct = async () => {
    if (!asinInput.trim()) return;
    setIsAdding(true);
    setAddResult(null);
    addLog(`Starting product add for: ${asinInput.trim()}`);

    try {
      const storedPass = sessionStorage.getItem('tl_admin_pass') || password;
      addLog('Scraping Amazon product data...');
      const res = await fetch('/api/admin/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amazonUrl: asinInput.trim(), adminPassword: storedPass }),
      });
      const data = await res.json();

      if (data.success) {
        addLog(`✅ Product added: "${data.product.title}"`);
        addLog(`✅ Scraped ${data.reviewCount || 0} reviews`);
        addLog(`✅ AI Verdict generated: ${data.product.verdictScore}/10`);
        setAddResult({ success: true, message: `Added: ${data.product.title}`, productSlug: data.product.slug });
      } else {
        addLog(`❌ Error: ${data.error}`);
        setAddResult({ success: false, message: data.error });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      addLog(`❌ ${msg}`);
      setAddResult({ success: false, message: msg });
    } finally {
      setIsAdding(false);
      setAsinInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TechLens Admin</h1>
                <p className="text-sm text-gray-400">Restricted access</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Admin Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Enter admin password"
                />
              </div>
              {authError && <p className="text-red-400 text-sm">{authError}</p>}
              <button
                onClick={handleLogin}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">TechLens Admin Panel</h1>
          </div>
          <Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition-colors">
            <ExternalLink className="w-4 h-4" /> View Site
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: '—', icon: Package, color: 'cyan' },
            { label: 'Total Reviews', value: '—', icon: Search, color: 'green' },
            { label: 'Total Videos', value: '—', icon: Video, color: 'red' },
            { label: 'DB Status', value: 'Online', icon: CheckCircle, color: 'green' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add Product */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            Add New Product
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Paste an Amazon product URL or ASIN. The system will auto-scrape product data, reviews from Amazon + Reddit, generate an AI verdict, and publish to the website.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={asinInput}
              onChange={e => setAsinInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !isAdding && handleAddProduct()}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
              placeholder="https://www.amazon.in/dp/B0XXXXXXXX or ASIN: B0XXXXXXXX"
            />
            <button
              onClick={handleAddProduct}
              disabled={isAdding || !asinInput.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isAdding ? 'Processing...' : 'Add Product'}
            </button>
          </div>

          {/* Result */}
          {addResult && (
            <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${addResult.success ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              {addResult.success
                ? <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                : <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />}
              <div>
                <p className={`font-medium ${addResult.success ? 'text-green-400' : 'text-red-400'}`}>
                  {addResult.success ? 'Product Added Successfully!' : 'Error'}
                </p>
                <p className="text-sm text-gray-400 mt-1">{addResult.message}</p>
                {addResult.productSlug && (
                  <Link href={`/products/${addResult.productSlug}`} className="text-sm text-cyan-400 hover:underline mt-1 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> View product page
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Logs */}
          {logs.length > 0 && (
            <div className="mt-4 bg-black/40 rounded-lg p-4 font-mono text-xs text-gray-400 max-h-40 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className={`${log.includes('✅') ? 'text-green-400' : log.includes('❌') ? 'text-red-400' : 'text-gray-400'}`}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Manual Cron Triggers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-cyan-400" />
            Manual Pipeline Triggers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Refresh All Prices', desc: 'Re-scrape Amazon prices for all products', endpoint: '/api/cron/refresh-prices', icon: RefreshCw },
              { label: 'Sync YouTube Videos', desc: 'Fetch latest videos from all 7 channels', endpoint: '/api/cron/fetch-youtube', icon: Video },
              { label: 'Regenerate Sitemap', desc: 'Rebuild sitemap.xml and ping Google', endpoint: '/api/cron/generate-sitemap', icon: Search },
            ].map(action => (
              <div key={action.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <action.icon className="w-5 h-5 text-cyan-400 mb-2" />
                <h3 className="font-medium text-white text-sm mb-1">{action.label}</h3>
                <p className="text-xs text-gray-400 mb-3">{action.desc}</p>
                <button
                  onClick={() => {
                    addLog(`Triggering: ${action.label}...`);
                    fetch(action.endpoint).then(r => r.json()).then(d => addLog(`✅ Done: ${JSON.stringify(d)}`)).catch(e => addLog(`❌ ${e.message}`));
                  }}
                  className="text-xs bg-white/10 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-400 px-3 py-1.5 rounded-lg transition-colors w-full"
                >
                  Run Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Status */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pipeline Status</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Amazon Scraper (ScrapingBee)', status: 'Active', color: 'green' },
              { label: 'Reddit Opinion Fetcher', status: 'Active', color: 'green' },
              { label: 'Gemini AI Verdict Engine', status: 'Active', color: 'green' },
              { label: 'YouTube Sync (7 channels)', status: 'Pending channel IDs', color: 'yellow' },
              { label: 'Video Upload Webhook', status: 'Listening', color: 'green' },
              { label: 'Vercel Cron Jobs', status: 'Scheduled', color: 'green' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-300">{item.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.color === 'green' ? 'bg-green-500/10 text-green-400' :
                  item.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
