import { HTMLAttributes } from "react";
import SectionSVG from "@/public/svg/SectionSvg";

type SectionProps = {
	crosses?: boolean;
	crossesOffset?: string;
	customPadding?: string;
} & HTMLAttributes<HTMLDivElement>;

const Section = ({
	children,
	crosses,
	crossesOffset,
	customPadding,
	className,
	...restProps
}: SectionProps) => {
	return (
		<section
			className={`relative ${
				customPadding || "py-10 lg:py-16 xl:py-20"
			} ${crosses ? "lg:py-32 xl:py-40" : ""} ${className || ""}`}
			{...restProps}
		>
			{children}

			<div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10"></div>
			<div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10"></div>

			{crosses ? (
				<>
					<div
						className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
							crossesOffset ? crossesOffset : ""
						} pointer-events-none lg:block xl:left-10 right-10`}
					></div>
					<SectionSVG crossesOffset={crossesOffset} />
				</>
			) : null}
		</section>
	);
};

export default Section;
