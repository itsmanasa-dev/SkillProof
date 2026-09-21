import type { ReactElement } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Icon } from '@/components/common/Icon'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatTime, useTimer } from '@/hooks/useTimer'
import { getChallengeById } from '@/data/mockChallenges'

interface TestResult {
  id: number
  label: string
  input: string
  expected: string
  passed: boolean | null
  actualOutput: string | null
}

export function AssessmentPage(): ReactElement {
  const { challengeId = 'ch-01' } = useParams()
  const navigate = useNavigate()
  const challenge = getChallengeById(challengeId)

  const [code, setCode] = useState<string>(challenge?.starterCode ?? '')
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [activeTest, setActiveTest] = useState(0)
  const seconds = useTimer(challenge?.timeMinutes ?? 30, true)
  const timeIsLow = seconds < 300

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-lg font-medium text-foreground">Assessment not found</p>
        <Button variant="outline" onClick={() => navigate('/app/assessments')}>
          Back to setup
        </Button>
      </div>
    )
  }

  const runCode = (): void => {
    if (running) return
    setRunning(true)
    setResults(null)
    window.setTimeout(() => {
      setResults(
        challenge.testCases.map((testCase, index) => {
          const passed = index < 4
          return {
            id: testCase.id,
            label: testCase.label,
            input: testCase.input,
            expected: testCase.expected,
            passed,
            actualOutput: passed ? testCase.expected : '""',
          }
        }),
      )
      setRunning(false)
    }, 1400)
  }

  const passedCount = results?.filter((r) => r.passed).length ?? 0

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-label="Exit assessment"
            onClick={() => navigate('/app/assessments')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted transition-colors hover:text-foreground"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground">
              {challenge.title}
            </h1>
            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <Badge tone="primary">{challenge.skillName}</Badge>
              <Badge>{challenge.difficulty}</Badge>
              <Badge tone="violet">{challenge.kind}</Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2">
            <Icon
              name="timer"
              className="h-4 w-4 text-muted"
            />
            <span
              className={`font-mono text-sm font-semibold ${
                timeIsLow ? 'text-destructive' : 'text-foreground'
              }`}
            >
              {formatTime(seconds)}
            </span>
          </div>
          <Button
            variant="violet"
            disabled={running}
            onClick={() => navigate(`/app/results/${challenge.id}`)}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-4 overflow-y-auto lg:max-h-[calc(100dvh-12rem)]">
          <div className="card-gradient rounded-xl border border-border p-6">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Problem
            </h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted">
              {challenge.prompt}
            </p>
          </div>

          <div className="card-gradient rounded-xl border border-border p-6">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Test cases
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {challenge.testCases.map((testCase) => (
                <li
                  key={testCase.id}
                  className="rounded-lg border border-border bg-surface-2 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      #{testCase.id} · {testCase.label}
                    </span>
                    <span className="font-mono text-xs text-faint">input</span>
                  </div>
                  <p className="mt-2 break-all font-mono text-sm text-muted">
                    {testCase.input}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="text-faint">expected </span>
                    <span className="font-mono text-success">
                      {testCase.expected}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2.5">
              <span className="text-sm font-medium text-foreground">
                solution.py
              </span>
              <span className="text-xs text-faint">Python 3</span>
            </div>
            <Editor
              height="46vh"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value ?? '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13.5,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 14, bottom: 14 },
                tabSize: 4,
              }}
              loading={
                <div className="flex h-full items-center justify-center bg-surface text-sm text-faint">
                  Loading editor...
                </div>
              }
            />
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">Output</span>
                {results && (
                  <Badge tone={passedCount === 5 ? 'success' : 'warning'}>
                    {passedCount}/5 passed
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={running}
                  onClick={runCode}
                >
                  <Icon name="play" className="h-4 w-4" />
                  Run
                </Button>
                <Button
                  size="sm"
                  disabled={running}
                  onClick={() => navigate(`/app/results/${challenge.id}`)}
                >
                  Submit
                </Button>
              </div>
            </div>

            <ResultsPanel
              results={results}
              running={running}
              activeTest={activeTest}
              onSelectTest={setActiveTest}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultsPanel({
  results,
  running,
  activeTest,
  onSelectTest,
}: {
  results: TestResult[] | null
  running: boolean
  activeTest: number
  onSelectTest: (index: number) => void
}): ReactElement {
  if (running) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-4"
      >
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm text-muted">
          Running 5 test cases against your solution...
        </span>
      </motion.div>
    )
  }

  if (!results) {
    return (
      <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-2 p-8 text-sm text-faint">
        Press Run to evaluate your solution against the test cases.
      </div>
    )
  }

  const selected = results[activeTest]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        {results.map((result, index) => (
          <button
            key={result.id}
            type="button"
            onClick={() => onSelectTest(index)}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
              index === activeTest
                ? 'border-border-strong bg-surface-2 text-foreground'
                : 'border-border text-muted hover:text-foreground'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                result.passed === null
                  ? 'bg-faint'
                  : result.passed
                    ? 'bg-success'
                    : 'bg-destructive'
              }`}
            />
            {result.label}
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-2 rounded-lg border border-border bg-surface-2 p-4 font-mono text-sm">
        <ResultLine label="input" value={selected.input} tone="muted" />
        <ResultLine
          label="expected"
          value={selected.expected}
          tone="success"
        />
        <ResultLine
          label="output"
          value={selected.actualOutput ?? '—'}
          tone={selected.passed === false ? 'destructive' : 'foreground'}
        />
      </div>
    </motion.div>
  )
}

function ResultLine({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'muted' | 'success' | 'destructive' | 'foreground'
}): ReactElement {
  const color = {
    muted: 'text-faint',
    success: 'text-success',
    destructive: 'text-destructive',
    foreground: 'text-foreground',
  }[tone]
  return (
    <p className="break-all">
      <span className="mr-2 text-faint">{label}</span>
      <span className={color}>{value}</span>
    </p>
  )
}