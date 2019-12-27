import React from 'react'
import { useDebouncedCallback } from 'use-debounce';

export const TextBox = ({peer}) => {
  const [debouncedCallback] = useDebouncedCallback((value) => {
    peer.write(value)
  }, 100, {leading: true})
  return <input onChange={
    (e) => debouncedCallback(e.target.value)}>
  </input>
}
