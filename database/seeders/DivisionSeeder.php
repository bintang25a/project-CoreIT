<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Division;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            [
                'name' => 'Programming',
                'description' => 'In this division, you will learn about Programing skills and logic. It is expected that later you can solve the Study case about Logical in Gemastik.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Cyber Security',
                'description' => 'In this division, you will explore the fundamentals of securing information systems. You will learn about threats, vulnerabilities, and how to protect data through ethical hacking and defense strategies in Gemastik scenarios.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Software Engineering',
                'description' => 'This division focuses on software development methodologies, design patterns, and team-based project building. You\'ll be trained to manage the full software development lifecycle and deliver structured solutions.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Game Development',
                'description' => 'In this division, you will dive into game design principles, mechanics, and interactive storytelling. You\'ll also practice developing engaging games while optimizing performance and user experience.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Data Mining',
                'description' => 'This division introduces data processing, pattern recognition, and predictive analytics. You will learn how to extract insights from large datasets to make data-driven decisions during competition cases.',
                'logo_path' => "123"
            ],
            [
                'name' => 'UI/UX',
                'description' => 'In this division, you will learn how to design user-centered interfaces and enhance user experiences. It emphasizes usability, wireframing, and prototyping to solve design problems effectively.',
                'logo_path' => "123"
            ],
            [
                'name' => 'ICT Business',
                'description' => 'This division explores the intersection between technology and business. You will learn how to create innovative business models using ICT, and how to pitch ideas that solve real-world problems.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Smart City',
                'description' => 'This division challenges you to design technology solutions that improve urban living. You will explore topics like smart mobility, energy, and urban data systems to build sustainable city innovations.',
                'logo_path' => "123"
            ],
            [
                'name' => 'ICT Scientific Paper',
                'description' => 'Here, you will focus on academic writing and research methodology. This division helps you articulate technical solutions in the form of scientific papers to be presented in ICT-themed conferences.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Internet of Things',
                'description' => 'In this division, you will learn how to connect hardware devices to the internet. You’ll work on sensor integration, microcontrollers, and data exchange to build intelligent IoT systems.',
                'logo_path' => "123"
            ],
            [
                'name' => 'Animation',
                'description' => 'This division emphasizes digital storytelling, 2D/3D design, and motion graphics. You will learn how to express complex ideas through engaging visual animations for various platforms.',
                'logo_path' => "123"
            ],
        ];


        foreach ($divisions as $division) {
            Division::create(['name' => $division['name'], 'description' => $division['description'], 'logo_path' => $division['logo_path']]);
        }
    }
}
