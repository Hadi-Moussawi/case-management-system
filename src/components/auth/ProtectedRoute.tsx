'use client';

import React from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // No more authentication checking
  return <>{children}</>;
};
