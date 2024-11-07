package sleepGuardian.domain.totalInformation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sleepGuardian.domain.sleepRecord.dto.SleepRecordResultDTO;
import sleepGuardian.domain.sleepRecord.service.SleepRecordService;
import sleepGuardian.domain.totalInformation.dto.SleepImpactRequestDTO;
import sleepGuardian.domain.totalInformation.dto.SleepImpactResponseDTO;
import sleepGuardian.domain.totalInformation.entity.TotalInformation;
import sleepGuardian.domain.totalInformation.repository.TotalInformationRepository;
import sleepGuardian.domain.user.entity.Users;
import sleepGuardian.domain.user.repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TotalInformationService {

    private final UserRepository userRepository;
    private final TotalInformationRepository totalInformationRepository;
    private final SleepRecordService sleepRecordService;

    public void startSleep(int userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보가 잘못되었습니다"));
        TotalInformation totalInformation = new TotalInformation(user);
        System.out.println(totalInformation);
        totalInformationRepository.save(totalInformation);
    }

    // 알코올, 카페인 기록 조회
    public SleepImpactResponseDTO getSleepImpact(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 수면정보가 존재하지 않습니다."));

        return new SleepImpactResponseDTO(totalInfo.getId(), totalInfo.getAlcoholIntake(), totalInfo.getCaffeineIntake());
    }

    // 알코올, 카페인 기록 저장
    public int saveSleepImpact(SleepImpactRequestDTO dto) {
        TotalInformation totalInfo = totalInformationRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        totalInfo.setSleepImpact(dto.getAlcoholIntake(), dto.getCaffeineIntake());
        return totalInformationRepository.save(totalInfo).getId();
    }

    public void endSleep(int totalInformationId) {
        TotalInformation totalInfo = totalInformationRepository.findById(totalInformationId)
                .orElseThrow(() -> new IllegalArgumentException("수면정보종합이 잘못되었습니다."));

        LocalDateTime date = LocalDateTime.now();
        LocalDateTime endTime = LocalDateTime.now(); //수면 측정 완료 시각
        int sleepTime = (int)Duration.between(totalInfo.getStartTime(), endTime).toMinutes();//총 수면 시간
//        LocalDateTime start_sleep_time = LocalDateTime.now(); //최용훈이 줄 거.
        System.out.println("레디스 접근?? 전");
        SleepRecordResultDTO sleepRecord = sleepRecordService.getSleepRecord(totalInformationId);
        System.out.println("레디스 접근?? 후");

        LocalDateTime startSleepTime = sleepRecord.getStartSleepTime();
        double avg = sleepRecord.getAvg();
        System.out.println(avg + " " + totalInfo.getStartTime() + " " + startSleepTime);

        if(startSleepTime == null) {
            startSleepTime = endTime;
        }

        int realSleepTime = (int) Duration.between(totalInfo.getStartTime(), startSleepTime).toMinutes();

        totalInfo.setSleepEnd(avg, date, sleepTime, realSleepTime, endTime, startSleepTime);
        totalInformationRepository.save(totalInfo);
    }
}