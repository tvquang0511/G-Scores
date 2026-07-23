import { Prisma, PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const BATCH_SIZE = 5000;

function toFloat(value?: string): number | null {
    if (!value || value.trim() === '') {
        return null;
    }

    const parsed = Number(value);

    return Number.isNaN(parsed) ? null : parsed;
}

async function seed() {
    const students: Prisma.StudentCreateManyInput[] = [];

    const csvPath = path.join(
        process.cwd(),
        'data',
        'diem_thi_thpt_2024.csv',
    );

    console.log('Reading CSV...');

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                students.push({
                    registrationNumber: row.sbd,

                    math: toFloat(row.toan),
                    literature: toFloat(row.ngu_van),
                    foreignLanguage: toFloat(row.ngoai_ngu),

                    physics: toFloat(row.vat_li),
                    chemistry: toFloat(row.hoa_hoc),
                    biology: toFloat(row.sinh_hoc),

                    history: toFloat(row.lich_su),
                    geography: toFloat(row.dia_li),
                    civicEducation: toFloat(row.gdcd),

                    foreignLanguageCode: row.ma_ngoai_ngu || null,
                });
            })
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`Loaded ${students.length} students`);

    console.log('Clearing existing data...');

    await prisma.student.deleteMany();

    console.log('Importing data...');

    for (let i = 0; i < students.length; i += BATCH_SIZE) {
        const batch = students.slice(i, i + BATCH_SIZE);

        await prisma.student.createMany({
            data: batch,
        });

        console.log(
            `Imported ${Math.min(i + BATCH_SIZE, students.length)} / ${students.length}`,
        );
    }

    console.log('Seed completed successfully');
}

seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });