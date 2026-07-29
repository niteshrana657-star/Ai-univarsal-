/**
 * -------------------------------------------------------------
 * Universal AI Operating Companion
 * Memory Search Engine
 * File: MemorySearchEngine.ts
 * -------------------------------------------------------------
 *
 * Searches and ranks stored memories.
 *
 * Features:
 * - Keyword search
 * - Relevance scoring
 * - Memory filtering
 * - Result ranking
 * -------------------------------------------------------------
 */


export interface SearchableMemory {

    id?: string;

    content: string;

    type?: string;

    metadata?:
        Record<string, unknown>;

    createdAt?: number;

}



export interface SearchResult {

    memory: SearchableMemory;

    score: number;

}



export class MemorySearchEngine {


    /**
     * Search memories
     */
    search(
        memories: SearchableMemory[],
        query: string
    ): SearchResult[] {


        const keyword =
            query
                .toLowerCase()
                .trim();



        if (!keyword) {

            return [];

        }



        return memories

            .map(memory => {


                const content =
                    memory.content
                        .toLowerCase();


                const score =
                    this.calculateScore(
                        content,
                        keyword
                    );


                return {

                    memory,

                    score

                };

            })


            .filter(
                result =>
                    result.score > 0
            )


            .sort(
                (a, b) =>
                    b.score - a.score
            );

    }



    /**
     * Calculate relevance score
     */
    private calculateScore(
        content: string,
        keyword: string
    ): number {


        let score = 0;



        if (
            content.includes(keyword)
        ) {

            score += 10;

        }



        const words =
            keyword.split(" ");



        for (const word of words) {


            if (
                content.includes(word)
            ) {

                score += 2;

            }

        }



        return score;

    }



    /**
     * Get best match
     */
    getBestMatch(
        results: SearchResult[]
    ):
        SearchResult | null {


        if (
            results.length === 0
        ) {

            return null;

        }


        return results[0];

    }



    /**
     * Limit results
     */
    limitResults(
        results: SearchResult[],
        limit: number = 10
    ):
        SearchResult[] {


        return results.slice(
            0,
            limit
        );

    }

}



export default MemorySearchEngine;
