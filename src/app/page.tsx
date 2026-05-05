import Image from "next/image"
import ButtonLogin from "./components/buttonLogin"
import { InstallGuard } from "./components/InstallPrompt"
import { ShoppingBag, BarChart3, Scan } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 overflow-hidden px-4 py-8 font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-orange-500/10 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-500/10 rounded-full blur-[60px]"></div>

      <div className="relative z-10 w-full flex flex-col items-center mt-auto mb-auto">

        <div className="mb-10 flex flex-col items-center animate-fluid-up">
          <div className="w-28 h-28 relative mb-6 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white p-3 border border-slate-100">
            <Image
              src="/logo.png"
              alt="StoreFlow"
              fill
              sizes="(max-width: 768px) 112px, 112px"
              className="object-contain p-2"
              priority
            />
          </div>
          <h1 className="text-[2.5rem] leading-none font-black text-slate-800 tracking-tight">StoreFlow</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.25em] mt-3">Sistema de Estoque</p>
        </div>

        <div className="w-full bg-white/90 backdrop-blur-md border border-white/60 rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] animate-fluid-up [animation-delay:150ms]">
          <div className="text-center mb-8">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Acesso ao Sistema</h2>
            <p className="text-slate-500 text-[13px] mt-2 leading-relaxed px-2">Conecte sua conta para gerenciar produtos e sincronizar seu e-commerce.</p>
          </div>

          <div className="w-full">
            <InstallGuard>
              <ButtonLogin />
            </InstallGuard>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 w-full px-2 animate-fluid-up [animation-delay:300ms]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center">
              <Scan className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Scanner</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Produtos</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[1.25rem] bg-white shadow-sm border border-slate-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Estoque</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-10 pb-2 flex flex-col items-center gap-1.5 opacity-80 animate-fluid-fade [animation-delay:600ms]">
        <span className="text-slate-400 text-[8px] font-bold tracking-[0.2em] uppercase">Desenvolvido por</span>
        <span className="text-slate-700 text-[10px] font-black tracking-[0.15em] uppercase">TW Serviços Digitais</span>
      </div>
    </div>
  )
}