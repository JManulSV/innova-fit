import { Container } from '@/components/layout/container'
import { Page } from '@/components/layout/page'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ClientDetailSkeleton() {
	return (
		<Page className='p-1'>
			<Container>
				<section className="border-b border-border pb-6">
					<Skeleton className="h-10 w-44 rounded-md" />

					<div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
						<div className="mt-4 flex items-center gap-4">
							<Skeleton className="h-16 w-16 rounded-xl" />

							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<Skeleton className="h-8 w-56" />
									<Skeleton className="h-6 w-20 rounded-full" />
								</div>

								<div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
									<Skeleton className="h-4 w-60" />
									<Skeleton className="h-4 w-40" />
								</div>

								<Skeleton className="h-4 w-48" />
							</div>
						</div>

						<div className="mt-4 flex gap-2 md:mt-0">
							<Skeleton className="h-10 w-32 rounded-md" />
							<Skeleton className="h-10 w-36 rounded-md" />
						</div>
					</div>
				</section>

				<section className="pt-4">
					<Skeleton className="h-4 w-52" />

					<div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{Array.from({ length: 4 }, (_, index) => (
							<Card key={index} className="border border-border bg-card p-4 shadow-sm">
								<div className="flex items-center gap-4">
									<Skeleton className="h-5 w-5 rounded-full" />
									<Skeleton className="h-3 w-28" />
								</div>

								<div className="mt-6">
									<Skeleton className="h-8 w-20" />
								</div>
							</Card>
						))}
					</div>
				</section>

				<section className="py-12">
					<div className="flex gap-4 border-b border-border">
						<Skeleton className="h-10 w-24 rounded-none rounded-t-md" />
						<Skeleton className="h-10 w-36 rounded-none rounded-t-md" />
						<Skeleton className="h-10 w-20 rounded-none rounded-t-md" />
					</div>

					<div className="mt-6 space-y-4">
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-40 w-full rounded-2xl" />
					</div>
				</section>
			</Container>
		</Page>
	)
}
