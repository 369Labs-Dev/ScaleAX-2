'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GIFT_CITY,
  JOB_EMPLOYER_TYPES,
  JOB_EXPERIENCE,
  JOB_FUNCTIONS,
  SAMPLE_JOBS,
} from '@/lib/gift-city-data';

const { jobs } = GIFT_CITY;

const FIELD =
  'h-12 w-full rounded-sx border border-sx-border bg-sx-white px-4 text-[16px] text-sx-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sx-ink';

// GIFT City jobs board: search and three filters over the listings, with the
// employer and job-alert panels beside it. The listings are examples and the
// actions lead to the contact form until the board's backend exists.
export function JobsBoard() {
  const [query, setQuery] = useState('');
  const [func, setFunc] = useState('');
  const [type, setType] = useState('');
  const [experience, setExperience] = useState('');

  const q = query.trim().toLowerCase();
  const results = SAMPLE_JOBS.filter(
    (job) =>
      (!q || `${job.title} ${job.company}`.toLowerCase().includes(q)) &&
      (!func || job.func === func) &&
      (!type || job.type === type) &&
      (!experience || job.experience === experience),
  );

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search job title or company"
            aria-label="Search job title or company"
            className={`${FIELD} sm:col-span-3`}
          />
          <Filter
            label="Function"
            all="All functions"
            value={func}
            onChange={setFunc}
            options={JOB_FUNCTIONS}
          />
          <Filter
            label="Employer type"
            all="All employers"
            value={type}
            onChange={setType}
            options={JOB_EMPLOYER_TYPES}
          />
          <Filter
            label="Experience"
            all="Any experience"
            value={experience}
            onChange={setExperience}
            options={JOB_EXPERIENCE}
          />
        </div>

        <p className="mt-5 text-[14px] text-sx-muted" aria-live="polite">
          {results.length} {results.length === 1 ? 'role' : 'roles'}. Listings shown are examples to
          demonstrate the layout.
        </p>

        <ul className="mt-3 border-t border-sx-ink">
          {results.map((job) => (
            <li
              key={job.title}
              className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-sx-border py-5"
            >
              <div className="min-w-0">
                <div className="text-[18px] font-black tracking-[-0.015em] text-sx-ink">
                  {job.title}
                </div>
                <div className="mt-1 text-[14px] text-sx-body">
                  {job.company} &middot; {job.type}
                </div>
                <div className="mt-1 text-[14px] text-sx-muted">
                  {job.func} &middot; {job.experience} &middot; {job.posted}
                </div>
              </div>
              <Link href="/contact" className="sx-btn sx-btn-ghost sx-btn-sm shrink-0">
                Apply
              </Link>
            </li>
          ))}
          {results.length === 0 && (
            <li className="border-b border-sx-border py-8 text-[16px] text-sx-body">
              No roles match these filters.
            </li>
          )}
        </ul>

        <ul className="mt-6 space-y-1.5">
          {jobs.candidate.map((line) => (
            <li key={line} className="text-[14px] text-sx-body">
              &middot; {line}
            </li>
          ))}
        </ul>
      </div>

      <aside className="space-y-4 lg:col-span-4">
        <div className="rounded-sx bg-sx-ink-deep p-7 text-sx-white">
          <h3 className="text-[20px] font-black tracking-[-0.015em] text-sx-white">
            {jobs.employerHeading}
          </h3>
          <p className="mt-3 text-[16px] leading-relaxed text-white/80">{jobs.employerText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="sx-btn sx-btn-light sx-btn-sm">
              {jobs.employerButtons[0]}
            </Link>
            <Link href="/contact" className="sx-btn sx-btn-outline-light sx-btn-sm">
              {jobs.employerButtons[1]}
            </Link>
          </div>
        </div>
        <div className="rounded-sx border border-sx-border bg-sx-white p-7">
          <h3 className="text-[20px] font-black tracking-[-0.015em] text-sx-ink">
            Looking for a role?
          </h3>
          <p className="mt-3 text-[16px] leading-relaxed text-sx-body">
            Get new GIFT City roles by email.
          </p>
          <Link href="/contact" className="sx-btn sx-btn-ghost sx-btn-sm mt-6">
            Set up job alerts
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Filter({
  label,
  all,
  value,
  onChange,
  options,
}: {
  label: string;
  all: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={FIELD}
    >
      <option value="">{all}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
