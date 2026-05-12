import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export function useConfig(clientId: string) {
  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from('configs')
          .select('config')
          .eq('client_id', clientId)
          .single()

        if (error) throw error
        setConfig(data.config)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [clientId])

  return { config, loading, error }
}

export function useFeatureFlag(config: any, flag: string): boolean {
  if (!config) return false
  return config.features?.[flag] === true
}