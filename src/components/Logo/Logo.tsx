import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'color' | 'white'
}

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
      className={clsx('h-9 w-auto', className)}
      src={variant === 'white' ? '/brand/portmizer-logo-white.png' : '/brand/portmizer-logo.png'}
    />
  )
}
