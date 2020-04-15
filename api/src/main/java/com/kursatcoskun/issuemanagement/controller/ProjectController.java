package com.kursatcoskun.issuemanagement.controller;


import com.kursatcoskun.issuemanagement.dto.ProjectDto;
import com.kursatcoskun.issuemanagement.services.impl.ProjectServiceImpl;
import com.kursatcoskun.issuemanagement.util.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(ApiPaths.ProjectCtrl.CTRL)
@Api(value = ApiPaths.ProjectCtrl.CTRL, description = "Project APIs")
@Slf4j
@CrossOrigin
public class ProjectController {

    private final ProjectServiceImpl projectServiceImpl;

    ProjectController(ProjectServiceImpl projectServiceImpl) {
        this.projectServiceImpl = projectServiceImpl;
    }


    @GetMapping("/getAllProjects")
    @ApiOperation(value = "Get All Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<List<ProjectDto>>> getAllProjects() {
        return ResponseEntity.ok(new UtilResponse<List<ProjectDto>>(projectServiceImpl.getAll(), new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @GetMapping("/getAllByPagination")
    @ApiOperation(value = "Get By Pagination Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<TPage<ProjectDto>>> getAllByPagination(Pageable pageable) {
        TPage<ProjectDto> data = projectServiceImpl.getAllPageable(pageable);
        return ResponseEntity.ok(new UtilResponse<TPage<ProjectDto>>(data, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @GetMapping("/getProjectById/{id}")
    @ApiOperation(value = "Get By Id Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<ProjectDto>> getById(@PathVariable("id") Long id) {
        ProjectDto projectDto = projectServiceImpl.getById(id);
        return ResponseEntity.ok(new UtilResponse<ProjectDto>(projectDto, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @PostMapping("CreateProject")
    @ApiOperation(value = "Create Project Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<ProjectDto>> createProject(@RequestBody ProjectDto projectDto) {
        ProjectDto projectSaved = projectServiceImpl.save(projectDto);
        return ResponseEntity.ok(new UtilResponse<ProjectDto>(projectSaved, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @PutMapping("/updateProject/{id}")
    @ApiOperation(value = "Update Project Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<ProjectDto>> updateProject(@PathVariable(value = "id", required = true) Long id, @Valid @RequestBody ProjectDto projectDto) {
        ProjectDto projectUpdated = projectServiceImpl.update(id, projectDto);
        return ResponseEntity.ok(new UtilResponse<ProjectDto>(projectUpdated, new ProcessResult("200", ResponseMessage.SUCCESS)));
    }

    @DeleteMapping("/deleteProject/{id}")
    @ApiOperation(value = "Delete Project Operation", response = UtilResponse.class)
    public ResponseEntity<UtilResponse<ProjectDto>> deleteProject(@PathVariable(value = "id", required = true) Long id) {
        if (projectServiceImpl.delete(id) == false) {
            return ResponseEntity.badRequest().body(new UtilResponse<ProjectDto>(null, new ProcessResult("400", ResponseMessage.SUCCESS)));
        }
        return ResponseEntity.ok((new UtilResponse<ProjectDto>(null, new ProcessResult("200", ResponseMessage.SUCCESS))));
    }

}
