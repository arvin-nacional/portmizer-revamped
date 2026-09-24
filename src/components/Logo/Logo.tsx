import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'color' | 'white'
}

/* The brand asset only exists in green, so the white treatment is a filter on it */
const whiteFilter = 'brightness-0 invert'

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    variant = 'color',
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Portmizer Philippines Corporation"
      width={844}
      height={175}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-9 w-auto', variant === 'white' && whiteFilter, className)}
      src="/brand/portmizer-logo.png"
    />
  )
}
