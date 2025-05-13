export interface TurtleProject {
  id: string;
  title: string;
  code: string;
  createdAt: Date;
}

export interface ConceptClarifierResult {
  explanation: string;
  exampleCode: string;
}
