import { describe, expect, it } from "vitest";
import {
  advanceWorkflow,
  getCurrentWorkflowStepMeta,
  getFirstWorkflowStepId,
  getNextWorkflowStepMeta,
  getWorkflowProgress,
  resolveWorkflowStages,
  setActiveWorkflowStep,
  type WorkflowRuntimeState,
  type WorkflowStageDefinition,
} from "../../../app/lib/workflow-engine";

interface TestWorkflowStep {
  id: string;
  label: string;
}

interface TestWorkflowStage extends WorkflowStageDefinition<TestWorkflowStep> {
  icon_key: "capture" | "proposal";
}

/**
 * Simple fixture that proves the engine only needs ordered workflow data plus a
 * runtime position. No local storage or CPQ workspace object is required.
 */
const TEST_WORKFLOW_STAGES: TestWorkflowStage[] = [
  {
    id: "capture",
    title: "Capture",
    icon_key: "capture",
    steps: [
      {
        id: "customer",
        label: "Customer",
      },
      {
        id: "quote",
        label: "Quote",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    icon_key: "proposal",
    steps: [
      {
        id: "scope",
        label: "Scope",
      },
    ],
  },
];

describe("workflow-engine", () => {
  it("derives workflow sections and step states from plain workflow data", () => {
    const runtimeState: WorkflowRuntimeState = {
      activeStepId: "quote",
      workflowCompleted: false,
    };

    const resolvedStages = resolveWorkflowStages(
      TEST_WORKFLOW_STAGES,
      runtimeState,
    );

    expect(getFirstWorkflowStepId(TEST_WORKFLOW_STAGES)).toBe("customer");
    expect(resolvedStages[0]).toMatchObject({
      id: "capture",
      icon_key: "capture",
      summary: "Step 2 of 2",
      state: "current",
    });
    expect(resolvedStages[0]?.steps.map((step) => step.state)).toEqual([
      "complete",
      "current",
    ]);
    expect(resolvedStages[1]).toMatchObject({
      id: "review",
      icon_key: "proposal",
      summary: "Upcoming",
      state: "upcoming",
    });
  });

  it("advances across stages and marks the workflow complete on the final step", () => {
    let runtimeState: WorkflowRuntimeState = {
      activeStepId: "customer",
      workflowCompleted: false,
    };

    runtimeState = advanceWorkflow(TEST_WORKFLOW_STAGES, runtimeState);
    expect(runtimeState).toEqual({
      activeStepId: "quote",
      workflowCompleted: false,
    });
    expect(
      getCurrentWorkflowStepMeta(TEST_WORKFLOW_STAGES, runtimeState)?.stepLabel,
    ).toBe("Quote");

    runtimeState = advanceWorkflow(TEST_WORKFLOW_STAGES, runtimeState);
    expect(runtimeState).toEqual({
      activeStepId: "scope",
      workflowCompleted: false,
    });
    expect(
      getNextWorkflowStepMeta(TEST_WORKFLOW_STAGES, runtimeState),
    ).toBeNull();

    runtimeState = advanceWorkflow(TEST_WORKFLOW_STAGES, runtimeState);
    expect(runtimeState).toEqual({
      activeStepId: "scope",
      workflowCompleted: true,
    });
    expect(getWorkflowProgress(TEST_WORKFLOW_STAGES, runtimeState)).toEqual({
      completeSteps: 3,
      totalSteps: 3,
      percent: 100,
    });
  });

  it("clears completion when selecting a valid step and ignores unknown steps", () => {
    const completedState: WorkflowRuntimeState = {
      activeStepId: "scope",
      workflowCompleted: true,
    };

    expect(
      setActiveWorkflowStep(TEST_WORKFLOW_STAGES, completedState, "quote"),
    ).toEqual({
      activeStepId: "quote",
      workflowCompleted: false,
    });
    expect(
      setActiveWorkflowStep(TEST_WORKFLOW_STAGES, completedState, "missing-step"),
    ).toEqual(completedState);
  });
});
