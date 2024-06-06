export interface IProject {
	id: number;
	name_project: string;
	value_project: number;
	duration_project: number;
	description_project: string;
	start_date_project: string;
	status_project?: boolean;
	final_date_project?: string;
	expected_final_date_project?: string;
}
