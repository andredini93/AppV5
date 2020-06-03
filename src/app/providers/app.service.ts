import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _httpService: HttpService
  ) { }

  public getAppsByProject(projectId){
		let url = `gdc/md/${projectId}/query/domains`;
		
		return this._httpService.get(url, {})
			.map((res:any) => {
                let appList = res.query.entries.filter(app =>{
					return app.title.startsWith("#Mobile");
				});

                return appList;
            });
    }
}
