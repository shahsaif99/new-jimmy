<?php

namespace App\Support;

/**
 * The supplier scoring model: each criterion is marked 0-100 and contributes
 * its weight toward a final score out of 100. Kept here rather than only in
 * the Vue form so the server can recompute the total instead of trusting
 * whatever the browser posts.
 */
class SupplierEvaluationCriteria
{
    public const PASS_MARK = 60;

    public const GROUPS = [
        'company' => [
            'label' => 'The company',
            'criteria' => [
                'financialStrength' => [
                    'name' => 'Financial strength',
                    'weight' => 10,
                    'description' => "Evaluation of the supplier's financial capacity and stability, incl. capacity and resources to carry out the mission.",
                ],
                'sustainability' => [
                    'name' => 'Sustainability and ethics',
                    'weight' => 5,
                    'description' => "Evaluation of the supplier's sustainability and ethical work, incl. environment, social responsibility.",
                ],
                'strategicPartner' => [
                    'name' => 'Strategic partner',
                    'weight' => 5,
                    'description' => 'Evaluation of the supplier as a strategic partner and the possibility of replacing them if necessary.',
                ],
                'certification' => [
                    'name' => 'Certification and external review',
                    'weight' => 10,
                    'description' => 'Evaluation of any external certifications, eg ISO.',
                ],
                'compliance' => [
                    'name' => 'Compliance with delivery conditions',
                    'weight' => 10,
                    'description' => "Evaluation of the supplier's ability to fulfill the agreed delivery conditions.",
                ],
            ],
        ],
        'service' => [
            'label' => 'Service',
            'criteria' => [
                'deliveryTime' => [
                    'name' => 'Delivery time',
                    'weight' => 10,
                    'description' => "Evaluation of the supplier's ability to deliver products or services according to the set time.",
                ],
                'customerService' => [
                    'name' => 'Customer service',
                    'weight' => 5,
                    'description' => "Evaluation of the supplier's customer service and communication skills.",
                ],
                'complaintHandling' => [
                    'name' => 'Complaint handling',
                    'weight' => 5,
                    'description' => "Evaluation of the supplier's ability to handle complaints.",
                ],
            ],
        ],
        'products' => [
            'label' => 'Products and prices',
            'criteria' => [
                'productRange' => [
                    'name' => 'Product range',
                    'weight' => 5,
                    'description' => "Evaluation of the supplier's breadth and depth in their offering of products and services.",
                ],
                'environmental' => [
                    'name' => 'Environmental & sustainability commitment',
                    'weight' => 10,
                    'description' => "Evaluation of the supplier's environmental work and commitment to sustainability issues, e.g. use of environmental labels.",
                ],
                'priceOverTime' => [
                    'name' => 'Price change over time',
                    'weight' => 10,
                    'description' => "Evaluation of the supplier's price development over time.",
                ],
                'priceCompetitiveness' => [
                    'name' => 'Price competitiveness',
                    'weight' => 10,
                    'description' => "Evaluation of the supplier's prices in relation to competitors' prices in the market.",
                ],
                'complaintFrequency' => [
                    'name' => 'Complaint frequency',
                    'weight' => 5,
                    'description' => 'Evaluation of the number of advertised products in relation to the total number of delivered products from the supplier.',
                ],
            ],
        ],
    ];

    /** @return array<string,int> criterion key => weight */
    public static function weights(): array
    {
        $weights = [];

        foreach (self::GROUPS as $group) {
            foreach ($group['criteria'] as $key => $criterion) {
                $weights[$key] = $criterion['weight'];
            }
        }

        return $weights;
    }

    public static function keys(): array
    {
        return array_keys(self::weights());
    }

    /**
     * Weighted total out of 100. Criteria left blank score zero, which is what
     * an unanswered question is worth.
     */
    public static function score(array $scores): float
    {
        $total = 0.0;

        foreach (self::weights() as $key => $weight) {
            $value = $scores[$key] ?? 0;
            $total += ((float) $value * $weight) / 100;
        }

        return round($total, 2);
    }

    public static function resultFor(float $score): string
    {
        return $score >= self::PASS_MARK
            ? \App\Models\SupplierEvaluation::STATUS_MEETS
            : \App\Models\SupplierEvaluation::STATUS_NOT_MEETS;
    }
}
