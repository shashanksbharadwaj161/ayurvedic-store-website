import { useEffect, useState } from 'react'
import { getProducts, getProduct, getCategories } from '../services/woocommerce'

export function useProducts(params = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const paramsKey = JSON.stringify(params)

  useEffect(() => {
    let active = true
    setLoading(true)
    getProducts(JSON.parse(paramsKey))
      .then(data => { if (active) setProducts(data) })
      .catch(err => { if (active) setError(err) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [paramsKey])

  return { products, loading, error }
}

export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!slug) return
    let active = true
    setLoading(true)
    setProduct(null)
    getProduct(slug)
      .then(data => { if (active) setProduct(data) })
      .catch(err => { if (active) setError(err) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [slug])

  return { product, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    let active = true
    getCategories()
      .then(data => { if (active) setCategories(data) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return { categories, loading }
}
