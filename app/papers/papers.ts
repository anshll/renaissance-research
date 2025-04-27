export interface Paper {
    id: number,
    title: string,
    author: string,
    year: number,
    category: string,
    scores: {
      latent_novelty_potential: number,
      cross_disciplinary_applicability: number,
      technical_timeliness: number,
      obscurity_advantage: number,
      total: number
    },
    optimist_justification: string[],
    devils_advocate_justification: string[],
    synthesizer_justification: string[],
    takeaway: string,
}

import paper_evals from "./paper_evals.json"

export const papers: Paper[] = paper_evals.sort((a, b) => a.id - b.id)