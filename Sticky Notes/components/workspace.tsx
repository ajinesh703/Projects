"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface WorkspaceProps {
  variables: Record<string, any>
  onClear: () => void
}

export function Workspace({ variables, onClear }: WorkspaceProps) {
  const getType = (value: any): string => {
    if (Array.isArray(value)) {
      return `${value.length}×${Array.isArray(value[0]) ? value[0].length : 1} double`
    }
    return typeof value
  }

  const getSize = (value: any): string => {
    if (Array.isArray(value)) {
      return `${value.length}×${Array.isArray(value[0]) ? value[0].length : 1}`
    }
    return "1×1"
  }

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) {
      if (value.length <= 2 && (!Array.isArray(value[0]) || value[0].length <= 2)) {
        return JSON.stringify(value)
      }
      return `[${value.length}×${Array.isArray(value[0]) ? value[0].length : 1} double]`
    }
    return String(value)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
        <span className="font-medium">Workspace Variables</span>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear All
        </Button>
      </div>

      <div className="flex-1 p-2">
        {Object.keys(variables).length === 0 ? (
          <div className="text-gray-500 text-center mt-4">No variables in workspace</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(variables).map(([name, value]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{formatValue(value)}</TableCell>
                  <TableCell>{getType(value)}</TableCell>
                  <TableCell>{getSize(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
