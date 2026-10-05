import { useState, useEffect, useCallback } from 'react'
import { Cpu, Check, RefreshCw, ShieldCheck, Download, Loader2 } from 'lucide-react'
import {
  getModels,
  setActiveModel,
  pullModel,
  type ModelOption,
  type ModelPullProgress,
} from '../lib/api'

interface SettingsViewProps {
  initialModel?: string
  customModels?: ModelOption[]
  onSelectModel?: (modelId: string) => void
}

interface InstallState {
  percent: number
  status: string
}

export function SettingsView({
  initialModel,
  customModels,
  onSelectModel,
}: SettingsViewProps) {
  const [selectedModel, setSelectedModel] = useState<string>(
    () => initialModel || 'gemma3:4b',
  )
  const [models, setModels] = useState<ModelOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<string>('Checking Ollama')
  const [installs, setInstalls] = useState<Record<string, InstallState>>({})
  const [error, setError] = useState<string | null>(null)


  const loadModels = useCallback((): Promise<void> => {
    return getModels()
      .then((data) => {
        setModels(data.models)
        setSelectedModel(data.active)
        setStatus(
          data.ollamaOnline
            ? `Connected, ${data.models.filter((m) => m.isInstalled).length} installed`
            : 'Ollama is not running',
        )
        setError(data.ollamaOnline ? null : 'Start Ollama to manage models')
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Could not reach DayBook')
        setStatus('Offline')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    void loadModels()
  }, [loadModels])

  function handleRefresh() {
    setIsLoading(true)
    void loadModels()
  }

  async function installModel(model: ModelOption) {
    if (installs[model.id]) return

    setError(null)
    setInstalls((prev) => ({ ...prev, [model.id]: { percent: 0, status: 'Starting' } }))

    try {
      await pullModel(model.id, (progress: ModelPullProgress) => {
        if (progress.error) {
          setError(progress.error)
          return
        }
        setInstalls((prev) => {
          const current = prev[model.id]
          if (!current) return prev
          return {
            ...prev,
            [model.id]: {
              percent: progress.percent ?? current.percent,
              status: progress.status ?? current.status,
            },
          }
        })
      })

      await loadModels()
      await setActiveModel(model.id)
      setSelectedModel(model.id)
      setStatus(`${model.name} installed and active`)
      onSelectModel?.(model.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not install model')
    } finally {
      setInstalls((prev) => {
        const next = { ...prev }
        delete next[model.id]
        return next
      })
    }
  }

  async function activate(model: ModelOption) {
    if (!model.isInstalled) {
      await installModel(model)
      return
    }

    setError(null)
    try {
      await setActiveModel(model.id)
      setSelectedModel(model.id)
      setStatus(`${model.name} is now active`)
      onSelectModel?.(model.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change model')
    }
  }

  const visibleModels = customModels && customModels.length > 0 ? customModels : models
  return (
    <div className="w-full flex flex-col justify-between space-y-4 max-h-[380px] sm:max-h-[420px] overflow-y-auto pr-1 scrollbar-none">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#4f8ee6]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1a2b49]">
              Change AI Model
            </h3>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4f8ee6] hover:text-[#3876cb] transition-colors cursor-pointer disabled:opacity-50"
            title="Scan installed models"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{status}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Select the local model used for journal reflection, prompt suggestions, and pattern detection. Models run privately on your machine.
        </p>

        {error && (
          <p className="text-[11px] text-rose-600 leading-normal">{error}</p>
        )}

        <div className="space-y-2.5">
          {isLoading && visibleModels.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-6 text-xs text-slate-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Looking for local models</span>
            </div>
          )}

          {visibleModels.map((model) => {
            const isSelected = selectedModel === model.id || selectedModel === model.tag
            const install = installs[model.id]
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => activate(model)}
                disabled={Boolean(install)}
                className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 disabled:cursor-wait ${
                  isSelected
                    ? 'bg-[#eff6fc]/70 border-[#6eafe9] shadow-xs'
                    : 'bg-[#FAF9F5] border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#1a2b49]">
                      {model.name}
                    </span>
                    {model.size && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-500 border border-slate-200/70 shadow-2xs">
                        {model.size}
                      </span>
                    )}
                    {model.isInstalled ? (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        Installed
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white text-slate-500 border border-slate-200/70">
                        Not installed
                      </span>
                    )}
                  </div>
                  {model.description && (
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-normal">
                      {model.description}
                    </p>
                  )}

                  {install && (
                    <div className="mt-2 space-y-1">
                      <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#6eafe9] rounded-full transition-all duration-300"
                          style={{ width: `${install.percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400">
                        <span className="truncate">{install.status}</span>
                        <span className="font-semibold">{install.percent}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                  {install ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#6eafe9] px-2.5 py-1 rounded-full shadow-2xs">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>{install.percent}%</span>
                    </span>
                  ) : isSelected ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#6eafe9] px-2.5 py-1 rounded-full shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Active</span>
                    </span>
                  ) : model.isInstalled ? (
                    <span className="text-[11px] font-medium text-slate-400 px-2 py-1 rounded-full border border-slate-200 bg-white">
                      Select
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#4f8ee6] px-2 py-1 rounded-full border border-[#6eafe9]/50 bg-white">
                      <Download className="w-3 h-3" />
                      <span>Install</span>
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
        <span>
          Private inference via Ollama. Journal entries never leave your device.
        </span>
      </div>
    </div>
  )
}
